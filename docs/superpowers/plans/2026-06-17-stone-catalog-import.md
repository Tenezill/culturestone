# Stone Catalog Batch Import — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import 21 real stones (data + photos) from the two client Excel sheets into Strapi, with all images stored on Cloudinary, replacing the existing placeholder seed data.

**Architecture:** Two-step pipeline. (1) A Python generator reads both `.xlsx` + scans the image folders and emits a reviewable `scripts/catalog.json`. (2) An external Node importer (REST, mirrors `migrate-stones.mjs`) deletes all existing stones + their media, ensures the two categories, then uploads photos and creates+publishes each stone. Cloudinary is already the configured Strapi upload provider, so uploads offload automatically.

**Tech Stack:** Python 3 + `openpyxl` (already installed) for the generator; Node 22 (built-in `fetch`/`FormData`) for the importer; Strapi v5.47 REST API with an API token.

**Testing note:** No test framework exists in either project, and these are one-shot operational scripts. Verification is by execution: inspect the generated `catalog.json`, run the importer in dry-run and read the printed plan, then verify post-`--confirm` via the API and admin. No unit-test scaffolding is introduced.

**Prerequisites:**
- Strapi running locally (`cd culturestone-cms && npm run develop`) at `http://localhost:1337`.
- `culturestone/.env` has `STRAPI_API_TOKEN` with **find/create/delete** on `stone`, `stone-category`, and **upload (incl. destroy)**. A Full-access token satisfies this.
- Image folders present at `C:\programming\chengfeng\images` and `images_2`.

---

### Task 1: Add `price` field to the stone schema

**Files:**
- Modify: `culturestone-cms/src/api/stone/content-types/stone/schema.json`

- [ ] **Step 1: Add the `price` attribute**

In the `attributes` object, after the `applications` attribute, add:

```json
    "price": {
      "type": "string",
      "pluginOptions": {
        "i18n": { "localized": false }
      }
    },
```

(Place it so the JSON remains valid — e.g. directly before the `"image"` attribute. Ensure the preceding attribute keeps its trailing comma and the new block ends with a comma.)

- [ ] **Step 2: Restart Strapi to migrate the DB**

Run (in `culturestone-cms/`): stop the dev server if running, then `npm run develop`.
Expected: server boots without schema errors; the admin → Content-Type Builder → Stone shows a new **price** (Text) field.

- [ ] **Step 3: Verify the field via API**

Run: `curl "http://localhost:1337/api/stones?pagination[pageSize]=1"`
Expected: request succeeds (200). The field set now includes `price` (value `null` on existing entries).

- [ ] **Step 4: Commit (CMS repo)**

```bash
cd culturestone-cms
git add src/api/stone/content-types/stone/schema.json
git commit -m "feat(stone): add price field"
```

---

### Task 2: Write the Python manifest generator

**Files:**
- Create: `culturestone/scripts/build-catalog-manifest.py`

- [ ] **Step 1: Write the generator**

Create `culturestone/scripts/build-catalog-manifest.py` with exactly:

```python
#!/usr/bin/env python3
"""Build scripts/catalog.json from the two client Excel sheets + image folders.

Reads:  <repo-parent>/images/stones_data.xlsx     (+ stone folders)
        <repo-parent>/images_2/stones_data.xlsx   (+ stone folders)
Writes: culturestone/scripts/catalog.json

Run once; the JSON is the human review checkpoint before importing.
No network access.
"""
import json
import os
import re
import sys
import unicodedata

import openpyxl

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_PARENT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
OUT_PATH = os.path.join(SCRIPT_DIR, "catalog.json")
SOURCES = ["images", "images_2"]

# Header label (row 1) -> manifest key
COLS = {
    "Folder_Name": "folder",
    "Category": "category",
    "Name": "name",
    "Alias": "alias",
    "Subhead": "subhead",
    "Description": "description",
    "Origin": "origin",
    "Finish": "finish",
    "Thickness": "thickness",
    "Applications": "applications",
    "Price": "price",
}


def slugify(name):
    n = unicodedata.normalize("NFD", name.lower())
    n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    n = re.sub(r"[^a-z0-9]+", "-", n)
    return n.strip("-")


def norm_price(raw):
    s = str(raw or "").strip()
    s = re.sub(r"-{2,}", "-", s)          # 300--500 -> 300-500
    return s.strip("- ").strip()


def norm_thickness(raw):
    m = re.search(r"\d+", str(raw or ""))
    return f"{m.group(0)}mm" if m else str(raw or "").strip()


def find_hero(files):
    for f in files:
        if re.match(r"(?i)^hero\.", f):
            return f
    return None


def gallery_sorted(files):
    g = [f for f in files if re.match(r"(?i)^gallery", f)]
    def key(f):
        m = re.search(r"\d+", f)
        return int(m.group(0)) if m else 0
    return sorted(g, key=key)


def main():
    out = []
    warnings = []
    for src in SOURCES:
        xlsx = os.path.join(REPO_PARENT, src, "stones_data.xlsx")
        wb = openpyxl.load_workbook(xlsx, data_only=True)
        ws = wb.worksheets[0]
        rows = list(ws.iter_rows(values_only=True))
        header = [str(c).strip() if c is not None else "" for c in rows[0]]
        idx = {COLS[h]: i for i, h in enumerate(header) if h in COLS}
        # rows[0] = English headers, rows[1] = Chinese header labels -> skip both
        for row in rows[2:]:
            def cell(key):
                i = idx.get(key)
                v = row[i] if i is not None and i < len(row) else None
                return str(v).strip() if v is not None else ""

            folder = cell("folder")
            name = cell("name")
            if not folder or not name:
                continue

            category = cell("category")
            # Decision: keep only the images/ "Prada Green" (Sintered Stone);
            # drop the images_2/ "Prada Green" (Marble).
            if name == "Prada Green" and src == "images_2":
                warnings.append(f"DROPPED duplicate: {src}/{folder} (Prada Green Marble)")
                continue

            folder_path = os.path.join(REPO_PARENT, src, folder)
            if not os.path.isdir(folder_path):
                warnings.append(f"MISSING folder: {src}/{folder}")
                continue
            files = os.listdir(folder_path)
            hero = find_hero(files)
            gallery = gallery_sorted(files)
            if not hero:
                warnings.append(f"NO hero in {src}/{folder}")
            if not gallery:
                warnings.append(f"NO gallery in {src}/{folder}")

            description = cell("description")
            # Auto-fix client copy-paste error in the Exotic Green entry.
            if name == "Exotic Green" and description.startswith("Amazon Green Marble"):
                description = "Exotic Green Marble" + description[len("Amazon Green Marble"):]
                warnings.append(f"FIXED description prefix for {src}/{folder} (Exotic Green)")

            out.append({
                "slug": slugify(name),
                "name": name,
                "alias": cell("alias"),
                "category": category,
                "subhead": cell("subhead"),
                "description": description,
                "origin": cell("origin"),
                "finish": cell("finish"),
                "thickness": norm_thickness(cell("thickness")),
                "applications": cell("applications"),
                "price": norm_price(cell("price")),
                "sourceDir": f"{src}/{folder}",
                "hero": hero,
                "gallery": gallery,
            })

    # Guard against slug collisions in the final set.
    slugs = {}
    for e in out:
        slugs.setdefault(e["slug"], []).append(e["sourceDir"])
    dupes = {s: dirs for s, dirs in slugs.items() if len(dirs) > 1}
    if dupes:
        for s, dirs in dupes.items():
            warnings.append(f"SLUG COLLISION '{s}': {dirs}")

    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    print(f"Wrote {len(out)} stones -> {OUT_PATH}")
    cats = {}
    for e in out:
        cats[e["category"]] = cats.get(e["category"], 0) + 1
    print("Categories:", dict(cats))
    if warnings:
        print("\nWarnings/notices:", file=sys.stderr)
        for w in warnings:
            print("  -", w, file=sys.stderr)
    if dupes:
        sys.exit(1)


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Commit (frontend repo)**

```bash
cd culturestone
git add scripts/build-catalog-manifest.py
git commit -m "feat(scripts): add Excel->catalog.json manifest generator"
```

---

### Task 3: Generate and review the manifest

**Files:**
- Create (generated): `culturestone/scripts/catalog.json`

- [ ] **Step 1: Run the generator**

Run (in `culturestone/`): `python scripts/build-catalog-manifest.py`
Expected stdout: `Wrote 21 stones -> .../scripts/catalog.json` and
`Categories: {'Sintered Stone': 17, 'Marble': 4}`.
Expected stderr notices include: `FIXED description prefix ... (Exotic Green)` and
`DROPPED duplicate: images_2/Prada Green ...`. **No `SLUG COLLISION` lines** (exit 0).

- [ ] **Step 2: Manually review `catalog.json`**

Open `scripts/catalog.json`. Confirm:
- 21 entries; every entry has a non-null `hero` and a non-empty `gallery`.
- `thickness` values look like `"9mm"` / `"18mm"`.
- `price` values have single dashes (no `--`).
- The Exotic Green `description` starts with "Exotic Green Marble".
- No two entries share a `slug`.

- [ ] **Step 3: Commit the reviewed manifest**

```bash
cd culturestone
git add scripts/catalog.json
git commit -m "chore(scripts): generate reviewed catalog.json (21 stones)"
```

---

### Task 4: Write the Node importer

**Files:**
- Create: `culturestone/scripts/import-catalog.mjs`

- [ ] **Step 1: Write the importer**

Create `culturestone/scripts/import-catalog.mjs` with exactly:

```javascript
#!/usr/bin/env node
// Batch import: scripts/catalog.json -> Strapi v5 `stones` (en locale, published).
//
// DESTRUCTIVE: deletes ALL existing stones and the media attached to them,
// then recreates the 21 stones from the manifest. Photos upload via Strapi's
// upload API, which offloads to Cloudinary (the configured provider).
//
// Dry-run by default — prints the full plan without writing. Pass --confirm to
// actually mutate. Targets STRAPI_URL (default http://localhost:1337).
//
// Usage:
//   node scripts/import-catalog.mjs            # dry-run
//   node scripts/import-catalog.mjs --confirm  # execute
//
// Env (.env): STRAPI_URL, STRAPI_API_TOKEN (find/create/delete on stone,
// stone-category, upload).

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
const TOKEN = process.env.STRAPI_API_TOKEN
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
  return res.json()
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
```

- [ ] **Step 2: Commit (frontend repo)**

```bash
cd culturestone
git add scripts/import-catalog.mjs
git commit -m "feat(scripts): add catalog importer (dry-run default, Cloudinary uploads)"
```

---

### Task 5: Dry-run and review the plan

- [ ] **Step 1: Run the importer in dry-run**

Run (in `culturestone/`, Strapi running): `node scripts/import-catalog.mjs`
Expected: prints `[dry-run] target http://localhost:1337 — 21 stones in manifest`,
a delete-phase line counting existing stones + media, two category lines
(`Sintered Stone`, `Marble` — "exists" or "will be created"), and 21 import-phase
lines each showing `hero=hero.JPG gallery=N`. Ends with
`[dry-run] done. Re-run with --confirm to apply.` **No writes occur.**

- [ ] **Step 2: Sanity-check the plan**

Confirm the delete count matches what's currently in Strapi, all 21 stones list a
hero and gallery count, and both categories are accounted for. If anything looks
wrong, fix the manifest/generator (Task 2–3) before proceeding.

---

### Task 6: Execute the import and verify

- [ ] **Step 1: Run with --confirm**

Run (in `culturestone/`): `node scripts/import-catalog.mjs --confirm`
Expected: delete lines for each existing stone + media, category create/exists
lines, then `+ stone <slug> created+published (<documentId>)` for all 21. Ends
with `done.` and no error.

- [ ] **Step 2: Verify via API (published + media + category)**

Run: `curl "http://localhost:1337/api/stones?populate=*&pagination[pageSize]=100" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const j=JSON.parse(d);console.log('count',j.data.length);const s=j.data[0];console.log('sample',s.slug,'image?',!!s.image,'gallery',(s.gallery||[]).length,'price',s.price,'cat',s.category?.name)})"`
Expected: `count 21`; sample shows `image? true`, a gallery count > 0, a `price`
string, and a category name. (Default API returns published entries only, so a
count of 21 confirms they published.)

- [ ] **Step 3: Verify images are on Cloudinary**

Run: `curl "http://localhost:1337/api/stones?populate[image]=true&pagination[pageSize]=1"`
Expected: the `image.url` starts with `https://res.cloudinary.com/` (not `/uploads/`).

- [ ] **Step 4: Spot-check in the admin + frontend**

In Strapi admin → Content Manager → Stone: 21 published entries, each with a hero
image, a gallery, a category, and a price. Then run the frontend
(`npm run dev`) and load `/catalog` — the 21 stones render with photos.

---

### Task 7: Update migration logs

**Files:**
- Modify: `culturestone-cms/migration.md`
- Modify: `culturestone/migration.md`

- [ ] **Step 1: Append CMS migration entry**

Add to the top of `culturestone-cms/migration.md` (under the title):

```markdown
## 2026-06-17 — Stone `price` field + real catalogue import

- Added `price` (string, non-localized) to the stone schema
- Imported 21 real stones (en locale, published) replacing placeholder seed data
- Photos uploaded via Strapi upload API → stored on Cloudinary
- Import is destructive (deletes all stones + their attached media first)
```

- [ ] **Step 2: Append frontend migration entry**

Add to the top of `culturestone/migration.md` (under the title):

```markdown
## 2026-06-17 — Catalogue import scripts

- Added `scripts/build-catalog-manifest.py` (Excel + image folders → `scripts/catalog.json`)
- Added `scripts/import-catalog.mjs` (dry-run default; `--confirm` to wipe + import 21 stones)
- Requires `STRAPI_API_TOKEN` with find/create/delete on stone, stone-category, upload
```

- [ ] **Step 3: Commit both repos**

```bash
cd culturestone-cms && git add migration.md && git commit -m "docs: log price field + catalogue import"
cd ../culturestone && git add migration.md && git commit -m "docs: log catalogue import scripts"
```

---

## Self-Review

**Spec coverage:**
- Replace all stones + delete their media → Task 4 `deleteAllStones`, Task 6.
- Add `price` field + import → Task 1, Task 4 payload.
- Drop images_2 "Prada Green" → Task 2 generator (explicit drop).
- en locale only → Task 4 `?locale=en`, single create.
- Price normalization, thickness `9mm`, Exotic Green auto-fix, tolerant gallery glob, filename sanitize → Task 2 generator + Task 4 `sanitizeName`.
- Slug-prefixed upload names → Task 4 `importStone`.
- Cloudinary offload (no infra work) → existing provider; verified Task 6 Step 3.
- Dry-run default / `--confirm` gate → Task 4, Task 5.
- Two categories ensured/created → Task 4 `ensureCategory`.

**Placeholder scan:** No TBD/TODO; all code blocks complete; all commands have expected output.

**Type consistency:** `ensureCategory` returns a numeric category id used as `data.category` in `importStone`; `uploadOne` returns the upload object and `.id` is used for `image`/`gallery`; `listAllStones` items expose `documentId`, `image.id`, `gallery[].id` consumed by `deleteAllStones`. Manifest keys produced by the generator (`slug`, `name`, `alias`, `category`, `subhead`, `description`, `origin`, `finish`, `thickness`, `applications`, `price`, `sourceDir`, `hero`, `gallery`) match those read in `importStone`.
