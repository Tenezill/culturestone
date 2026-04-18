#!/usr/bin/env node
// One-shot migration: hardcoded catalog -> Strapi v5 `stones` collection.
//
// Safe to re-run: each stone is upserted by slug (create on first run,
// update on subsequent runs). Images in /public/img are uploaded to the
// Strapi Media Library once and attached to the `image` Media field on
// the matching stone; re-runs skip uploads already present in the library
// (matched by filename) and skip attaches already satisfied.
//
// Usage:
//   node scripts/migrate-stones.mjs
//
// Env (load via `.env`):
//   STRAPI_URL         defaults to http://localhost:1337
//   STRAPI_API_TOKEN   required; needs write scope on `stones` and `upload`

import { readFile, readFileSync } from 'node:fs'
import { readFile as readFileP } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadDotEnv() {
  const envPath = resolve(__dirname, '..', '.env')
  let raw
  try {
    raw = readFileSync(envPath, 'utf8')
  } catch {
    return
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = val
  }
}

loadDotEnv()

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN
const PUBLIC_IMG_DIR = resolve(__dirname, '..', 'public', 'img')

if (!STRAPI_API_TOKEN) {
  console.error('Missing STRAPI_API_TOKEN. Add it to .env and re-run.')
  process.exit(1)
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Source of truth while this script runs. Mirrors the *active* entries in
// composables/useSignatureStones.ts combined with data/signatureStonePageDetails.ts.
// After migration, Strapi owns the data and these can be removed.
const STONES = [
  {
    name: 'Carrara Fantastico',
    origin: 'Apuan Alps, Tuscany',
    subhead: 'Bespoke Italian Marble',
    description:
      'A dramatic Carrara selection defined by graphite veining across a luminous white field. Suited to statement surfaces where contrast and rhythm matter as much as light.',
    finish: 'Honed or polished',
    thickness: '2 cm and 3 cm',
    applications: 'Flooring, cladding, vanity tops',
    imageFile: 'ai-light-marble.jpg',
  },
  {
    name: 'Nero Antico',
    origin: 'Levanto, Liguria',
    subhead: 'Deep Italian Marble',
    description:
      'Rich jet-black ground traced by delicate hairline white veining in frost-like patterns. Quiet and disciplined from afar, crystalline under close inspection.',
    finish: 'Leathered, honed, or high polish',
    thickness: '2 cm and 3 cm',
    applications: 'Feature walls, hearths, wet bars',
    imageFile: 'ai-dark-marble.jpg',
  },
  {
    name: 'Calacatta Oro',
    origin: 'Carrara basin, Tuscany',
    subhead: 'Bespoke Italian Marble',
    description:
      'Bold rivers of honey and amber veining flow across a warm ivory body, accented with fine graphite hairlines. A Calacatta expression in a noticeably warmer register than Statuario.',
    finish: 'Polished or honed',
    thickness: '2 cm and 3 cm',
    applications: 'Kitchen islands, bathrooms, lobbies',
    imageFile: 'ai-veined-stone.jpg',
  },
  {
    name: 'Grigio Carnico',
    origin: 'Carnia, Friuli',
    subhead: 'Italian Dark Marble',
    description:
      'A deep charcoal ground crossed by a dense web of pale crystalline veining. Dramatic yet disciplined; pairs cleanly with blackened steel and dark timber.',
    finish: 'Honed, brushed, or polished',
    thickness: '2 cm and 3 cm',
    applications: 'Feature walls, flooring, vanity tops',
    imageFile: 'ai-rock-formation.jpg',
  },
  {
    name: 'Giallo Imperiale',
    origin: 'Brazil',
    subhead: 'Semi-Precious Quartzite',
    description:
      'Translucent amber and caramel body shot through with deep ochre and bronze veining. Best reserved for focal planes where backlighting can reveal its luminosity.',
    finish: 'Polished',
    thickness: '2 cm',
    applications: 'Backlit panels, inset tables, art walls',
    imageFile: 'ai-stone-wall.jpg',
  },
  {
    name: 'Verde Alpi',
    origin: 'Aosta Valley',
    subhead: 'Italian Serpentine Marble',
    description:
      'Deep forest green with white calcite veining. A sculptural color for contrast palettes.',
    finish: 'Honed or polished',
    thickness: '2 cm and 3 cm',
    applications: 'Vanities, bars, fireplace surrounds',
    imageFile: 'ai-blue-green.jpg',
  },
  {
    name: 'Travertino Romano',
    origin: 'Tivoli basin, Lazio',
    subhead: 'Classic Roman Travertine',
    description:
      'Open cell structure and warm ivory tone. Filled or unfilled depending on tactile intent.',
    finish: 'Honed, brushed, or filled and polished',
    thickness: '2 cm and 3 cm',
    applications: 'Flooring, facades, stair threads',
    imageFile: 'ai-cracked-stone.jpg',
  },
  {
    name: 'Onice Fantastico',
    origin: 'Iran',
    subhead: 'Translucent Blue Onyx',
    description:
      'Layered bands of sapphire, teal, and pearl-white run through a naturally translucent body. Demands thoughtful lighting design to reveal its glacial depth.',
    finish: 'Polished',
    thickness: '2 cm',
    applications: 'Backlit walls, bars, feature niches',
    imageFile: 'ai-blue-coral.jpg',
  },
  {
    name: 'Rosso Lepanto',
    origin: 'Levanto, Liguria',
    subhead: 'Italian Red Marble',
    description:
      'Wine-red ground traced by bold, rivering white veining. Romantic and assertive in equal measure.',
    finish: 'Polished or honed',
    thickness: '2 cm and 3 cm',
    applications: 'Powder rooms, insets, furniture tops',
    imageFile: 'ai-pink-marble.jpg',
  },
  {
    name: 'Calacatta Viola',
    origin: 'Tuscany',
    subhead: 'Bespoke Italian Marble',
    description:
      'Bold violet and plum veining flows across a warm ivory body, accented with charcoal hairlines. A contemporary Calacatta expression with unmistakable character.',
    finish: 'Honed or polished',
    thickness: '2 cm and 3 cm',
    applications: 'Islands, bathrooms, architectural reveals',
    imageFile: 'ai-purple-marble.jpg',
  },
]

const jsonHeaders = {
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  'Content-Type': 'application/json',
}
const authHeader = { Authorization: `Bearer ${STRAPI_API_TOKEN}` }

// --- stones -----------------------------------------------------------------

async function findStoneBySlug(slug) {
  const url = new URL(`${STRAPI_URL}/api/stones`)
  url.searchParams.set('filters[slug][$eq]', slug)
  url.searchParams.set('pagination[pageSize]', '1')
  url.searchParams.set('populate[0]', 'image')
  const res = await fetch(url, { headers: authHeader })
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}: ${await res.text()}`)
  return (await res.json()).data?.[0] ?? null
}

async function createStone(payload) {
  const res = await fetch(`${STRAPI_URL}/api/stones`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ data: payload }),
  })
  if (!res.ok) throw new Error(`POST stones -> ${res.status}: ${await res.text()}`)
  return (await res.json()).data
}

async function updateStone(documentId, payload) {
  const res = await fetch(`${STRAPI_URL}/api/stones/${documentId}`, {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({ data: payload }),
  })
  if (!res.ok)
    throw new Error(`PUT stones/${documentId} -> ${res.status}: ${await res.text()}`)
  return (await res.json()).data
}

// --- media ------------------------------------------------------------------

async function findUploadByName(filename) {
  // Strapi upload plugin: /api/upload/files returns an array (not { data: [...] }).
  const url = new URL(`${STRAPI_URL}/api/upload/files`)
  url.searchParams.set('filters[name][$eq]', filename)
  const res = await fetch(url, { headers: authHeader })
  if (!res.ok) return null
  const body = await res.json()
  const arr = Array.isArray(body) ? body : body.results || body.data || []
  return arr[0] || null
}

async function uploadFile(filepath, filename) {
  const buf = await readFileP(filepath)
  const fd = new FormData()
  fd.append('files', new Blob([buf], { type: 'image/jpeg' }), filename)
  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: 'POST',
    headers: authHeader, // DO NOT set Content-Type; fetch adds boundary
    body: fd,
  })
  if (!res.ok) throw new Error(`upload ${filename} -> ${res.status}: ${await res.text()}`)
  const arr = await res.json()
  return arr[0]
}

// --- main -------------------------------------------------------------------

async function main() {
  let stonesCreated = 0
  let stonesUpdated = 0
  let imagesUploaded = 0
  let imagesReused = 0
  let imagesAttached = 0
  let imagesSkipped = 0

  for (const stone of STONES) {
    const slug = slugify(stone.name)
    const { imageFile, ...rest } = stone
    const stonePayload = { ...rest, slug }

    // Upsert the stone record.
    let record = await findStoneBySlug(slug)
    if (record) {
      await updateStone(record.documentId, stonePayload)
      stonesUpdated++
      console.log(`~ stone    ${slug.padEnd(22)} (updated)`)
    } else {
      record = await createStone(stonePayload)
      stonesCreated++
      console.log(`+ stone    ${slug.padEnd(22)} (created)`)
    }

    // Re-fetch with image populated so we can tell if an attach is needed.
    record = await findStoneBySlug(slug)

    if (record?.image) {
      imagesSkipped++
      console.log(`  image    ${slug.padEnd(22)} already attached (#${record.image.id})`)
      continue
    }

    // Find existing upload by filename, or upload from disk.
    let upload = await findUploadByName(imageFile)
    if (upload) {
      imagesReused++
      console.log(`= upload   ${imageFile} reused (#${upload.id})`)
    } else {
      const filepath = resolve(PUBLIC_IMG_DIR, imageFile)
      upload = await uploadFile(filepath, imageFile)
      imagesUploaded++
      console.log(`↑ upload   ${imageFile} uploaded (#${upload.id})`)
    }

    // Attach the media ID to the stone's `image` Media field.
    await updateStone(record.documentId, { image: upload.id })
    imagesAttached++
    console.log(`* attach   ${slug.padEnd(22)} <- file #${upload.id}`)
  }

  console.log(
    `\nStones:  created=${stonesCreated} updated=${stonesUpdated} (total ${STONES.length})`,
  )
  console.log(
    `Images:  uploaded=${imagesUploaded} reused=${imagesReused} attached=${imagesAttached} already-ok=${imagesSkipped}`,
  )
}

main().catch((err) => {
  console.error('\nMigration failed:', err)
  process.exit(1)
})
