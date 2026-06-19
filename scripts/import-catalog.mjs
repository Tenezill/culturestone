#!/usr/bin/env node
// Batch import: scripts/catalog.json -> Strapi v5 `stones` (en locale, published).
//
// DESTRUCTIVE: deletes ALL existing stones and the media attached to them,
// then recreates every stone from the manifest. Photos upload via Strapi's
// upload API, which offloads to Cloudinary (the configured provider).
//
// Dry-run by default — prints the full plan without writing. Pass --confirm to
// actually mutate. Targets NUXT_PUBLIC_STRAPI_URL / STRAPI_URL (default
// http://localhost:1337) — currently production https://cms.culturestone.eu.
//
// Usage:
//   node scripts/import-catalog.mjs            # dry-run
//   node scripts/import-catalog.mjs --confirm  # execute
//
// Env (.env): STRAPI_API_IMPORT_TOKEN (preferred) or STRAPI_API_TOKEN —
// needs find/create/delete on stone, stone-category, upload.

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

function sanitizeName(name) {
  // ASCII-only upload filename, e.g. "amazon-green-gallery8.jpg"
  return name.normalize('NFD').replace(/[^\x20-\x7E]/g, '').replace(/\s+/g, '-')
}

async function api(path, opts = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, opts)
  if (!res.ok) throw new Error(`${opts.method || 'GET'} ${path} -> ${res.status}: ${await res.text()}`)
  const text = await res.text() // DELETE returns 204 / empty body
  return text ? JSON.parse(text) : null
}

// --- delete phase -----------------------------------------------------------

async function listAllStones() {
  // status=draft lists every document (published docs also have a draft version).
  const items = []
  let page = 1
  for (;;) {
    const url = `/api/stones?status=draft&populate[0]=image&populate[1]=gallery` +
      `&pagination[page]=${page}&pagination[pageSize]=100`
    const body = await api(url, { headers: authHeader })
    items.push(...(body.data || []))
    const pc = body.meta?.pagination?.pageCount ?? 1
    if (page >= pc) break
    page++
  }
  return items
}

async function deleteAllStones() {
  const stones = await listAllStones()
  const mediaIds = new Set()
  for (const s of stones) {
    if (s.image?.id) mediaIds.add(s.image.id)
    for (const g of s.gallery || []) if (g?.id) mediaIds.add(g.id)
  }
  console.log(`${tag}delete ${stones.length} stones, ${mediaIds.size} attached media files`)
  if (!CONFIRM) return
  for (const s of stones) {
    await api(`/api/stones/${s.documentId}`, { method: 'DELETE', headers: authHeader })
    console.log(`  - stone ${s.documentId} deleted`)
  }
  for (const id of mediaIds) {
    await api(`/api/upload/files/${id}`, { method: 'DELETE', headers: authHeader })
    console.log(`  - media #${id} deleted`)
  }
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

// --- import phase -----------------------------------------------------------

async function uploadOne(absPath, targetName) {
  const buf = await readFileP(absPath)
  const fd = new FormData()
  fd.append('files', new Blob([buf], { type: 'image/jpeg' }), targetName)
  const res = await fetch(`${STRAPI_URL}/api/upload`, { method: 'POST', headers: authHeader, body: fd })
  if (!res.ok) throw new Error(`upload ${targetName} -> ${res.status}: ${await res.text()}`)
  return (await res.json())[0]
}

async function importStone(entry, categoryId) {
  const dir = join(REPO_PARENT, entry.sourceDir)
  console.log(`${tag}stone ${entry.slug}: hero=${entry.hero} gallery=${entry.gallery.length} cat='${entry.category}'`)
  if (!CONFIRM) return

  const heroUp = await uploadOne(join(dir, entry.hero), `${entry.slug}-hero.jpg`)
  const galleryIds = []
  let n = 1
  for (const g of entry.gallery) {
    const up = await uploadOne(join(dir, g), `${entry.slug}-${sanitizeName(`gallery${n}`)}.jpg`)
    galleryIds.push(up.id)
    n++
  }
  const data = {
    name: entry.name, slug: entry.slug, alias: entry.alias || null,
    subhead: entry.subhead, description: entry.description, origin: entry.origin,
    finish: entry.finish, thickness: entry.thickness, applications: entry.applications,
    price: entry.price || null, image: heroUp.id, gallery: galleryIds,
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
  console.log('== delete phase ==')
  await deleteAllStones()
  console.log('\n== category phase ==')
  const catIds = {}
  for (const name of [...new Set(manifest.map((e) => e.category))]) {
    catIds[name] = await ensureCategory(name)
  }
  console.log('\n== import phase ==')
  for (const entry of manifest) await importStone(entry, catIds[entry.category])
  console.log(`\n${tag}done.${CONFIRM ? '' : ' Re-run with --confirm to apply.'}`)
}

main().catch((err) => { console.error('\nImport failed:', err); process.exit(1) })
