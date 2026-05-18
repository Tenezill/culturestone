#!/usr/bin/env node
// Renames stone categories in Strapi by old slug (non-destructive).
//
// Usage:
//   node scripts/rename-categories.mjs
//
// Env (loaded from `.env`):
//   STRAPI_URL, STRAPI_API_TOKEN

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

/** @type {{ fromSlugs: string[], name: string, slug: string }[]} */
const RENAMES = [
  { fromSlugs: ['slate', 'sintered-stone'], name: 'Sintered Stone', slug: 'sintered-stone' },
  { fromSlugs: ['flexible_stone', 'flexible-stone', 'ceramic-tile', 'ceramic_tile'], name: 'Ceramic Tile', slug: 'ceramic_tile' },
]

const auth = { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
const jsonHeaders = { ...auth, 'Content-Type': 'application/json' }

async function findBySlug(slug) {
  const url = new URL(`${STRAPI_URL}/api/stone-categories`)
  url.searchParams.set('filters[slug][$eq]', slug)
  url.searchParams.set('pagination[pageSize]', '1')
  const res = await fetch(url, { headers: auth })
  if (!res.ok) throw new Error(`GET stone-categories?slug=${slug} -> ${res.status}: ${await res.text()}`)
  return (await res.json()).data?.[0] ?? null
}

async function updateCategory(documentId, data, locale) {
  const url = new URL(`${STRAPI_URL}/api/stone-categories/${documentId}`)
  if (locale) url.searchParams.set('locale', locale)
  const res = await fetch(url, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({ data }),
  })
  if (!res.ok) throw new Error(`PUT stone-categories/${documentId} -> ${res.status}: ${await res.text()}`)
  return (await res.json()).data
}

async function main() {
  console.log(`Strapi: ${STRAPI_URL}\n`)

  for (const { fromSlugs, name, slug } of RENAMES) {
    let existing = null
    let matchedFrom = null
    for (const fromSlug of fromSlugs) {
      existing = await findBySlug(fromSlug)
      if (existing) {
        matchedFrom = fromSlug
        break
      }
    }
    if (!existing) {
      const already = await findBySlug(slug)
      if (already) {
        console.log(`  ✓ ${slug} already exists as "${already.name}" — skip`)
        continue
      }
      console.warn(`  ! No category matching ${fromSlugs.join(' / ')} (and "${slug}" not found) — skip`)
      continue
    }

    const locales = existing.localizations?.length
      ? ['en', ...existing.localizations.map((l) => l.locale).filter(Boolean)]
      : ['en']

    for (const locale of [...new Set(locales)]) {
      await updateCategory(existing.documentId, { name, slug }, locale)
      console.log(`  ✓ ${matchedFrom} → "${name}" (${slug}) [locale=${locale}]`)
    }
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error('\nRename failed:', err)
  process.exit(1)
})
