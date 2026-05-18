#!/usr/bin/env node
// Resets the stone catalog: deletes all existing stones + stone-categories,
// then creates the 9 correct category shells. Stones are added manually via
// the Strapi admin panel afterwards.
//
// Usage:
//   node scripts/migrate-catalog.mjs
//
// Env (loaded from `.env`):
//   STRAPI_URL         defaults to http://localhost:1337
//   STRAPI_API_TOKEN   required; needs delete + create scope on stone-categories and stones

import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadDotEnv() {
  const envPath = resolve(__dirname, '..', '.env')
  let raw
  try { raw = readFileSync(envPath, 'utf8') } catch { return }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = val
  }
}

loadDotEnv()

const STRAPI_URL = (process.env.NUXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '')
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

if (!STRAPI_API_TOKEN) {
  console.error('Missing STRAPI_API_TOKEN. Add it to .env and re-run.')
  process.exit(1)
}

const CATEGORIES = [
  { name: 'Marble',            slug: 'marble' },
  { name: 'Extravagante Stone', slug: 'extravagante-stone' },
  { name: 'Granite',           slug: 'granite' },
  { name: 'Artificial Stone',  slug: 'artificial-stone' },
  { name: 'Sintered Stone',    slug: 'sintered-stone' },
  { name: 'PC Brick',          slug: 'pc-brick' },
  { name: 'Culture Stone',     slug: 'culture-stone' },
  { name: 'Ceramic Tile',      slug: 'ceramic-tile' },
  { name: 'PU Cultured Stone', slug: 'pu-cultured-stone' },
]

const auth = { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
const jsonHeaders = { ...auth, 'Content-Type': 'application/json' }

async function getAllDocumentIds(endpoint) {
  const ids = []
  let page = 1
  while (true) {
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`)
    url.searchParams.set('pagination[page]', String(page))
    url.searchParams.set('pagination[pageSize]', '100')
    url.searchParams.set('fields[0]', 'documentId')
    const res = await fetch(url, { headers: auth })
    if (!res.ok) throw new Error(`GET ${url} -> ${res.status}: ${await res.text()}`)
    const items = (await res.json()).data ?? []
    for (const item of items) ids.push(item.documentId)
    if (items.length < 100) break
    page++
  }
  return ids
}

async function deleteAll(endpoint) {
  const ids = await getAllDocumentIds(endpoint)
  for (const documentId of ids) {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}/${documentId}`, {
      method: 'DELETE',
      headers: auth,
    })
    if (!res.ok) throw new Error(`DELETE ${endpoint}/${documentId} -> ${res.status}: ${await res.text()}`)
    console.log(`  - ${endpoint}/${documentId}`)
  }
  return ids.length
}

async function createCategory(data) {
  const res = await fetch(`${STRAPI_URL}/api/stone-categories`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ data }),
  })
  if (!res.ok) throw new Error(`POST stone-categories -> ${res.status}: ${await res.text()}`)
  return (await res.json()).data
}

async function main() {
  console.log('Step 1: Deleting all stones...')
  const stonesDeleted = await deleteAll('stones')
  console.log(`  Deleted ${stonesDeleted} stone(s).\n`)

  console.log('Step 2: Deleting all stone categories...')
  const catsDeleted = await deleteAll('stone-categories')
  console.log(`  Deleted ${catsDeleted} category(ies).\n`)

  console.log('Step 3: Creating 9 new categories...')
  for (const cat of CATEGORIES) {
    await createCategory(cat)
    console.log(`  + ${cat.name}`)
  }
  console.log(`\nDone. ${CATEGORIES.length} categories created.`)
}

main().catch((err) => {
  console.error('\nMigration failed:', err)
  process.exit(1)
})
