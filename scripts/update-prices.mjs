#!/usr/bin/env node
// Non-destructive price update: scripts/catalog.json -> Strapi v5 `stones`.
//
// Reads the raw CNY/m² price ranges from the manifest (e.g. "400-600"),
// converts them to EUR at a fixed rate, and writes the numeric `priceFrom` /
// `priceTo` fields onto each existing stone, matched BY SLUG. It does NOT touch
// media, names, or any other field, and never deletes anything.
//
// Requires the `priceFrom` / `priceTo` integer fields to exist on the stone
// content type — i.e. the CMS must be (re)deployed with the updated schema
// BEFORE running this with --confirm.
//
// Dry-run by default: resolves every stone by slug against the live API and
// prints the conversion plan without writing. Pass --confirm to apply.
//
// Usage:
//   node scripts/update-prices.mjs            # dry-run (read-only)
//   node scripts/update-prices.mjs --confirm  # execute
//
// Env (.env): STRAPI_API_IMPORT_TOKEN (preferred) or STRAPI_API_TOKEN —
// needs find + update on stone. Targets NUXT_PUBLIC_STRAPI_URL / STRAPI_URL.

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Fixed CNY -> EUR rate (incl. a small buffer over spot ~0.129, see migration
// log 2026-06-20). Bump manually when re-pricing.
const CNY_EUR = 0.13

function loadDotEnv() {
  const envPath = resolve(__dirname, '..', '.env')
  let raw
  try { raw = readFileSync(envPath, 'utf8') } catch { return }
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    let val = t.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = val
  }
}
loadDotEnv()

const STRAPI_URL = (process.env.NUXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '')
const TOKEN = process.env.STRAPI_API_IMPORT_TOKEN || process.env.STRAPI_API_TOKEN
const CONFIRM = process.argv.includes('--confirm')
const LOCALE = 'en'
const MANIFEST = resolve(__dirname, 'catalog.json')

if (!TOKEN) { console.error('Missing STRAPI_API_TOKEN in .env'); process.exit(1) }

const authHeader = { Authorization: `Bearer ${TOKEN}` }
const jsonHeaders = { ...authHeader, 'Content-Type': 'application/json' }
const tag = CONFIRM ? '' : '[dry-run] '

async function api(path, opts = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, opts)
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} -> ${res.status}: ${await res.text()}`)
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

// "400-600" -> { from: 52, to: 78 } (EUR). Returns null when no number found.
function convertPrice(raw) {
  const nums = String(raw ?? '').match(/\d+/g)
  if (!nums || nums.length === 0) return null
  const low = parseInt(nums[0], 10)
  const high = parseInt(nums[nums.length - 1], 10)
  return {
    from: Math.round(low * CNY_EUR),
    to: Math.round(high * CNY_EUR),
  }
}

async function findStoneBySlug(slug) {
  // status=draft resolves the document regardless of publish state.
  // Only whitelist `slug` — priceFrom/priceTo may not exist on the server yet
  // (pre-schema-deploy dry-run), and an unknown key in fields[] would 400.
  const body = await api(
    `/api/stones?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&status=draft&locale=${LOCALE}&pagination[pageSize]=1&fields[0]=slug`,
    { headers: authHeader },
  )
  return body.data?.[0] ?? null
}

async function updateStone(documentId, data) {
  // Update both the draft and the published version so the admin and the
  // live site stay in sync.
  await api(`/api/stones/${documentId}?locale=${LOCALE}`, {
    method: 'PUT', headers: jsonHeaders, body: JSON.stringify({ data }),
  })
  await api(`/api/stones/${documentId}?status=published&locale=${LOCALE}`, {
    method: 'PUT', headers: jsonHeaders, body: JSON.stringify({ data }),
  })
}

async function main() {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
  console.log(`${tag}target ${STRAPI_URL} — ${manifest.length} stones, rate CNY->EUR = ${CNY_EUR}\n`)

  let updated = 0
  const missing = []
  const unpriced = []

  for (const entry of manifest) {
    const eur = convertPrice(entry.price)
    if (!eur) {
      unpriced.push(entry.slug)
      console.log(`${tag}- ${entry.slug.padEnd(28)} no price in manifest -> skipped`)
      continue
    }
    const stone = await findStoneBySlug(entry.slug)
    if (!stone) {
      missing.push(entry.slug)
      console.log(`${tag}! ${entry.slug.padEnd(28)} NOT FOUND on server -> skipped`)
      continue
    }
    const was = `(was from=${stone.priceFrom ?? '∅'} to=${stone.priceTo ?? '∅'})`
    console.log(`${tag}+ ${entry.slug.padEnd(28)} ${String(entry.price).padEnd(12)} -> from=${eur.from} to=${eur.to} €/m² ${was}`)
    if (CONFIRM) {
      await updateStone(stone.documentId, { priceFrom: eur.from, priceTo: eur.to })
      updated++
    }
  }

  console.log(`\n${tag}done. ${CONFIRM ? `${updated} updated.` : 'Re-run with --confirm to apply.'}`)
  if (missing.length) console.log(`  not found (${missing.length}): ${missing.join(', ')}`)
  if (unpriced.length) console.log(`  no manifest price (${unpriced.length}): ${unpriced.join(', ')}`)
}

main().catch((err) => { console.error('\nPrice update failed:', err); process.exit(1) })
