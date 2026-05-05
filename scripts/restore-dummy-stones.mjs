#!/usr/bin/env node
// One-off script: restores the 21 placeholder stones under the Marble category.
// Run once, then delete this file.
//
// Usage: node scripts/restore-dummy-stones.mjs

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
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
    if (!(key in process.env)) process.env[key] = val
  }
}

loadDotEnv()

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

if (!STRAPI_API_TOKEN) { console.error('Missing STRAPI_API_TOKEN.'); process.exit(1) }

const auth = { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
const jsonHeaders = { ...auth, 'Content-Type': 'application/json' }

const STONES = [
  { name: 'Jazz White',        alias: '爵士白',    origin: 'Guangxi, China',        subhead: 'Chinese White Marble',        description: 'Bright white ground with subtle grey veining. Elegant and versatile for both modern and classical interiors.',                                                                                       finish: 'Honed or polished',        thickness: '2 cm and 3 cm', applications: 'Flooring, wall cladding, countertops' },
  { name: 'Ariston White',     alias: '雅士白',    origin: 'Greece',                subhead: 'Greek White Marble',          description: 'Fine-grained white marble with delicate grey streaks. A timeless choice for luxury residential and hospitality spaces.',                                                                         finish: 'Honed or polished',        thickness: '2 cm and 3 cm', applications: 'Bathroom walls, flooring, sculptures' },
  { name: 'Crystal White',     alias: '晶白玉',    origin: 'China',                 subhead: 'Chinese White Jade Marble',   description: 'Near-pure white with a crystalline lustre. Clean and serene for minimalist and contemporary design.',                                                                                            finish: 'Polished',                 thickness: '2 cm and 3 cm', applications: 'Feature walls, floors, vanities' },
  { name: 'Han White Jade',    alias: '汉白玉',    origin: 'Fangshan, Beijing',     subhead: 'Imperial Chinese White Marble', description: 'The revered white marble of Chinese imperial architecture. Dense and bright white with a natural warmth used for millennia in monumental works.',                                              finish: 'Honed or polished',        thickness: '2 cm and 3 cm', applications: 'Sculptures, columns, flooring' },
  { name: 'Nero Marquina',     alias: '黑金花',    origin: 'Markina-Xemein, Spain', subhead: 'Spanish Black Marble',        description: 'Jet-black ground with bold golden veining. A classic of high-contrast luxury interiors — assertive, refined, and unmistakable.',                                                                finish: 'Polished or honed',        thickness: '2 cm and 3 cm', applications: 'Feature walls, flooring, countertops' },
  { name: 'Black and White Root', alias: '黑白根', origin: 'Guangdong, China',     subhead: 'Chinese Black Marble',        description: 'Black base threaded with white root-like veining. Graphic and architectural in character — strong without being heavy.',                                                                         finish: 'Polished',                 thickness: '2 cm and 3 cm', applications: 'Wall cladding, stair risers, feature surfaces' },
  { name: 'Absolute Black',    alias: '纯黑',      origin: 'China',                 subhead: 'Pure Black Granite',          description: 'Uniform deep black with minimal patterning. A disciplined, modern foundation for any high-contrast palette.',                                                                                   finish: 'Polished or honed',        thickness: '2 cm and 3 cm', applications: 'Flooring, countertops, facades' },
  { name: 'Sahara Beige',      alias: '莎安娜米黄', origin: 'Iran',                 subhead: 'Persian Cream Marble',        description: 'Warm cream field with fine amber and brown veining. Rich and welcoming — a natural choice for residential and hospitality environments.',                                                       finish: 'Polished or honed',        thickness: '2 cm and 3 cm', applications: 'Flooring, bathroom walls, reception areas' },
  { name: 'Golden Spider',     alias: '金线米黄',   origin: 'Turkey',               subhead: 'Turkish Cream Marble',        description: 'Light cream marble threaded with golden veins. Luminous and refined — at its best in large-format polished installations.',                                                                      finish: 'Polished',                 thickness: '2 cm and 3 cm', applications: 'Floors, walls, columns' },
  { name: 'Crema Marfil',      alias: '西班牙米黄', origin: 'Alicante, Spain',      subhead: 'Spanish Cream Marble',        description: 'Soft uniform cream with subtle fossil inclusions. Timeless versatility for large-format applications and warm, inviting interiors.',                                                           finish: 'Polished, honed, or brushed', thickness: '2 cm and 3 cm', applications: 'Flooring, stair treads, outdoor paving' },
  { name: 'Botticino Classico', alias: '波西米亚米黄', origin: 'Brescia, Italy',   subhead: 'Italian Cream Marble',        description: 'Warm beige Italian marble with fine tan veining. An enduring classic of Italian architecture, at home in both classical and contemporary settings.',                                              finish: 'Polished or honed',        thickness: '2 cm and 3 cm', applications: 'Floors, facades, interior walls' },
  { name: 'Large White Flower', alias: '大花白',   origin: 'China',                 subhead: 'Chinese Grey Marble',         description: 'White-grey ground with pronounced dark veining flowing in broad sweeps. Bold and architectural — a natural focal point on large wall panels.',                                                   finish: 'Polished or honed',        thickness: '2 cm and 3 cm', applications: 'Feature walls, lobby floors, large-format panels' },
  { name: 'Sesame Grey',       alias: '芝麻灰',    origin: 'China',                 subhead: 'Chinese Grey Granite',        description: 'Medium grey with a consistent speckled texture. Durable and refined for high-traffic surfaces and exterior applications.',                                                                       finish: 'Honed, flamed, or polished', thickness: '2 cm and 3 cm', applications: 'Exterior paving, flooring, countertops' },
  { name: 'Ice Crystal Grey',  alias: '冰晶灰',    origin: 'China',                 subhead: 'Chinese Grey Marble',         description: 'Cool pale grey with crystalline white veining. Clean and luminous for contemporary minimalist interiors.',                                                                                        finish: 'Polished',                 thickness: '2 cm and 3 cm', applications: 'Bathroom walls, floors, vanities' },
  { name: 'Deep Grey',         alias: '深灰',      origin: 'China',                 subhead: 'Dark Grey Marble',            description: 'Deep charcoal grey with minimal veining. Strong and composed for modern architectural applications that demand presence without drama.',                                                          finish: 'Honed or polished',        thickness: '2 cm and 3 cm', applications: 'Feature walls, flooring, cladding' },
  { name: 'Yellow Wood Grain', alias: '木纹黄',    origin: 'China',                 subhead: 'Chinese Wood Grain Marble',   description: 'Warm amber tones with flowing linear veining that mimics natural timber grain. Inviting and organic — a bridge between stone and wood.',                                                        finish: 'Honed or polished',        thickness: '2 cm and 3 cm', applications: 'Feature walls, flooring, furniture tops' },
  { name: 'Grey Wood Grain',   alias: '木纹灰',    origin: 'China',                 subhead: 'Chinese Wood Grain Marble',   description: 'Cool grey with parallel linear striations. A contemporary bridge between stone and timber aesthetics, suited to modern residential interiors.',                                                  finish: 'Honed or polished',        thickness: '2 cm and 3 cm', applications: 'Wall panels, countertops, floors' },
  { name: 'White Wood Grain',  alias: '木纹白',    origin: 'China',                 subhead: 'Chinese Wood Grain Marble',   description: 'Pale white stone with soft linear veining. Bright and airy with a natural warmth that works in both formal and relaxed settings.',                                                              finish: 'Honed or polished',        thickness: '2 cm and 3 cm', applications: 'Bathroom walls, floors, feature panels' },
  { name: 'Jade Green',        alias: '翡翠绿',    origin: 'China',                 subhead: 'Chinese Green Marble',        description: 'Deep emerald green with lighter jade veining. Rare and opulent — best reserved for statement surfaces where colour is the design.',                                                             finish: 'Polished',                 thickness: '2 cm and 3 cm', applications: 'Feature walls, luxury furniture, accent surfaces' },
  { name: 'Blue Pearl',        alias: '蓝珍珠',    origin: 'Norway',                subhead: 'Norwegian Larvikite',         description: 'Dark grey-blue stone with iridescent feldspar crystals that shift colour under light. Hypnotic and distinctive — unlike any other material.',                                                  finish: 'Polished',                 thickness: '2 cm and 3 cm', applications: 'Countertops, reception desks, feature floors' },
  { name: 'Rosso Norvegico',   alias: '挪威红',    origin: 'Norway',                subhead: 'Norwegian Red Granite',       description: 'Rich deep red granite with dark mineral inclusions. Bold and enduring for exterior and feature applications that demand permanence.',                                                          finish: 'Polished or flamed',       thickness: '2 cm and 3 cm', applications: 'Exterior cladding, flooring, monuments' },
]

function slugify(name) {
  return name.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

async function getMarbleCategoryId() {
  const url = new URL(`${STRAPI_URL}/api/stone-categories`)
  url.searchParams.set('filters[slug][$eq]', 'marble')
  url.searchParams.set('pagination[pageSize]', '1')
  const res = await fetch(url, { headers: auth })
  if (!res.ok) throw new Error(`GET stone-categories -> ${res.status}: ${await res.text()}`)
  const item = (await res.json()).data?.[0]
  if (!item) throw new Error('Marble category not found. Run migrate-catalog.mjs first.')
  return item.documentId
}

async function createStone(data) {
  const res = await fetch(`${STRAPI_URL}/api/stones?status=published`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ data }),
  })
  if (!res.ok) throw new Error(`POST stones -> ${res.status}: ${await res.text()}`)
  return (await res.json()).data
}

async function main() {
  const marbleId = await getMarbleCategoryId()
  console.log(`Marble category documentId: ${marbleId}\n`)

  for (const stone of STONES) {
    const payload = { ...stone, slug: slugify(stone.name), category: marbleId }
    await createStone(payload)
    console.log(`  + ${stone.name}`)
  }

  console.log(`\nDone. ${STONES.length} stones restored under Marble.`)
}

main().catch((err) => { console.error('\nFailed:', err); process.exit(1) })
