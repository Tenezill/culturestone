#!/usr/bin/env node
// Append import: scripts/catalog.json -> Strapi v5 `stones` (en locale, published).
//
// NON-DESTRUCTIVE. Unlike import-catalog.mjs, this NEVER deletes or modifies
// existing data. It looks up which stone slugs already live in the CMS and
// creates ONLY the ones that are missing, uploading just their media. Stones a
// customer has edited in the Strapi admin are left completely untouched.
//
// Use this for adding new batches. Use import-catalog.mjs only for a full
// from-scratch rebuild (it wipes everything first).
//
// Dry-run by default — prints exactly what would be created without writing.
// Pass --confirm to actually create. Targets NUXT_PUBLIC_STRAPI_URL / STRAPI_URL
// (default http://localhost:1337) — currently production https://cms.culturestone.eu.
//
// Usage:
//   node scripts/append-catalog.mjs            # dry-run
//   node scripts/append-catalog.mjs --confirm  # execute
//
// Env (.env): STRAPI_API_IMPORT_TOKEN (preferred) or STRAPI_API_TOKEN —
// needs find/create on stone, find/create on stone-category, and upload.

import { readFileSync } from 'node:fs'
import { readFile as readFileP } from 'node:fs/promises'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
const REPO_PARENT = resolve(__dirname, '..', '..')
const MANIFEST = resolve(__dirname, 'catalog.json')

if (!TOKEN) { console.error('Missing STRAPI_API_TOKEN in .env'); process.exit(1) }

const authHeader = { Authorization: `Bearer ${TOKEN}` }
const jsonHeaders = { ...authHeader, 'Content-Type': 'application/json' }
const tag = CONFIRM ? '' : '[dry-run] '

// Fixed CNY -> EUR rate (matches update-prices.mjs, see migration log 2026-06-20).
const CNY_EUR = 0.13

// "1400-2800" (raw CNY/m²) -> { from: 182, to: 364 } (EUR). null if no number.
function convertPrice(raw) {
  const nums = String(raw ?? '').match(/\d+/g)
  if (!nums || nums.length === 0) return null
  const low = parseInt(nums[0], 10)
  const high = parseInt(nums[nums.length - 1], 10)
  return { from: Math.round(low * CNY_EUR), to: Math.round(high * CNY_EUR) }
}

function sanitizeName(name) {
  // ASCII-only upload filename, e.g. "amazon-green-gallery8.jpg"
  return name.normalize('NFD').replace(/[^\x20-\x7E]/g, '').replace(/\s+/g, '-')
}

async function api(path, opts = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, opts)
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} -> ${res.status}: ${await res.text()}`)
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

// --- discovery phase --------------------------------------------------------

async function existingSlugs() {
  // status=draft lists every document (published docs also have a draft version),
  // so a stone the customer has unpublished still counts as "already present".
  const slugs = new Set()
  let page = 1
  for (;;) {
    const url = `/api/stones?status=draft&fields[0]=slug` +
      `&pagination[page]=${page}&pagination[pageSize]=100`
    const body = await api(url, { headers: authHeader })
    for (const s of body.data || []) if (s.slug) slugs.add(s.slug)
    const pc = body.meta?.pagination?.pageCount ?? 1
    if (page >= pc) break
    page++
  }
  return slugs
}

// --- category phase ---------------------------------------------------------

async function ensureCategory(name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  const found = await api(
    `/api/stone-categories?filters[slug][$eq]=${encodeURIComponent(slug)}&pagination[pageSize]=1`,
    { headers: authHeader },
  )
  const existing = found.data?.[0]
  if (existing) { console.log(`${tag}category '${name}' exists (#${existing.id})`); return existing.id }
  console.log(`${tag}category '${name}' will be created (slug=${slug})`)
  if (!CONFIRM) return null
  // stone-category has draftAndPublish:false -> created live, no status param.
  const created = await api(`/api/stone-categories`, {
    method: 'POST', headers: jsonHeaders, body: JSON.stringify({ data: { name, slug } }),
  })
  console.log(`  + category '${name}' created (#${created.data.id})`)
  return created.data.id
}

// --- create phase -----------------------------------------------------------

async function uploadOne(absPath, targetName) {
  const buf = await readFileP(absPath)
  const fd = new FormData()
  fd.append('files', new Blob([buf], { type: 'image/jpeg' }), targetName)
  const res = await fetch(`${STRAPI_URL}/api/upload`, { method: 'POST', headers: authHeader, body: fd })
  if (!res.ok) throw new Error(`upload ${targetName} -> ${res.status}: ${await res.text()}`)
  return (await res.json())[0]
}

async function createStone(entry, categoryId) {
  const dir = join(REPO_PARENT, entry.sourceDir)
  console.log(`${tag}+ stone ${entry.slug}: hero=${entry.hero} gallery=${entry.gallery.length} cat='${entry.category}'`)
  if (!CONFIRM) return

  const heroUp = await uploadOne(join(dir, entry.hero), `${entry.slug}-hero.jpg`)
  const galleryIds = []
  let n = 1
  for (const g of entry.gallery) {
    const up = await uploadOne(join(dir, g), `${entry.slug}-${sanitizeName(`gallery${n}`)}.jpg`)
    galleryIds.push(up.id)
    n++
  }
  const eur = convertPrice(entry.price)
  const data = {
    name: entry.name, slug: entry.slug, alias: entry.alias || null,
    subhead: entry.subhead, description: entry.description, origin: entry.origin,
    finish: entry.finish, thickness: entry.thickness, applications: entry.applications,
    priceFrom: eur?.from ?? null, priceTo: eur?.to ?? null,
    image: heroUp.id, gallery: galleryIds,
    category: categoryId,
  }
  const created = await api(`/api/stones?status=published&locale=${LOCALE}`, {
    method: 'POST', headers: jsonHeaders, body: JSON.stringify({ data }),
  })
  console.log(`  + stone ${entry.slug} created+published (${created.data.documentId})`)
}

// --- main -------------------------------------------------------------------

async function main() {
  const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
  console.log(`${tag}target ${STRAPI_URL} — ${manifest.length} stones in manifest\n`)

  console.log('== discovery phase ==')
  const present = await existingSlugs()
  const toCreate = manifest.filter((e) => !present.has(e.slug))
  const skipped = manifest.filter((e) => present.has(e.slug))
  console.log(`${tag}${present.size} stones already in CMS — ${skipped.length} manifest entries already present, ${toCreate.length} new to create`)
  for (const e of skipped) console.log(`  = skip (exists, untouched): ${e.slug}`)
  if (!toCreate.length) {
    console.log(`\n${tag}nothing new to add. Done.`)
    return
  }

  console.log('\n== category phase ==')
  const catIds = {}
  for (const name of [...new Set(toCreate.map((e) => e.category))]) {
    catIds[name] = await ensureCategory(name)
  }

  console.log('\n== create phase ==')
  for (const entry of toCreate) await createStone(entry, catIds[entry.category])

  console.log(`\n${tag}done — ${toCreate.length} stone(s) ${CONFIRM ? 'created' : 'would be created'}.${CONFIRM ? '' : ' Re-run with --confirm to apply.'}`)
}

main().catch((err) => { console.error('\nAppend failed:', err); process.exit(1) })
