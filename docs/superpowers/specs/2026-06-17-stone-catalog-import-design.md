# Stone Catalog Batch Import — Design

**Date:** 2026-06-17
**Status:** Approved (approach A, dry-run default)

## Goal

Import the real product catalogue (21 stones) from the two client-supplied
Excel sheets + image folders into the Strapi CMS, with all photos stored on
Cloudinary (not the VPS disk). Replace the existing placeholder seed data.

## Source data

Two folders sit in the **non-versioned repo parent** `C:\programming\chengfeng\`:

- `images/` — `stones_data.xlsx` + 10 stone folders, all **Sintered Stone**
- `images_2/` — `stones_data.xlsx` + 12 stone folders, mix of **Sintered Stone** and **Marble**

Each `stones_data.xlsx` has one data sheet. Row 1 = English column headers,
row 2 = Chinese header labels (NOT data — skipped). Columns:
`Folder_Name, Category, Name, Alias, Subhead, Description, Origin, Finish,
Thickness (mm), Applications, Price (¥/㎡)`.

Each stone folder contains `hero.JPG` + `gallery1.JPG`…`galleryN.JPG`.

### Count: 21 stones

10 from `images/` + 12 from `images_2/` − 1 dropped duplicate = **21**.

### Decisions baked in

- **Replace all:** delete every existing `stone` entry AND its attached media
  (image + gallery) so no orphans remain in Cloudinary. Only media attached to
  deleted stones is removed — unrelated uploads are left alone.
- **Price:** add a new `price` string field to the `stone` schema; store the
  range verbatim (e.g. `"900-1200"`).
- **"Prada Green" collision:** keep only the `images/` entry (Sintered Stone);
  **drop** the `images_2/` "Prada Green" (Marble). Avoids the `prada-green` slug clash.
- **Locale:** create `en` entries only. `zh` left empty for manual translation.

### Data cleanups applied by the generator

- Drop `images_2/Prada Green`.
- Normalise prices: `300--500` → `300-500`, `800---2300` → `800-2300` (collapse
  repeated dashes, trim).
- Trim trailing whitespace/newlines on all cells (Applications cells have them).
- Format thickness as `"9mm"` / `"18mm"` (number + `mm`, no space).
- **Auto-fix:** `images_2/Exotic Green` description text reads "Amazon Green
  Marble features…" — a client copy-paste error. Generator rewrites the leading
  "Amazon Green Marble" → "Exotic Green Marble" and prints a notice.
- `images_2/Exotic Green` folder has no `gallery1` (starts at `gallery2`) and a
  file named `gallery8、.JPG` (Chinese comma). Gallery globbing is tolerant; the
  comma is sanitised out of the upload filename.

## Architecture — two steps

### Step 1 — `scripts/build-catalog-manifest.py` (Python, openpyxl)

Reads both `.xlsx`, scans the folders, applies the cleanups above, and writes a
reviewable `scripts/catalog.json`. Prints warnings (typo, missing gallery1) to
stderr. No network access. Run once; the JSON is the human review checkpoint.

**Manifest entry shape:**

```json
{
  "slug": "amazon-green",
  "name": "Amazon Green",
  "alias": "Exotic Green",
  "category": "Sintered Stone",
  "subhead": "Amazon Green Sintered Stone",
  "description": "…",
  "origin": "China",
  "finish": "Polished / Honed / Leathered",
  "thickness": "9mm",
  "applications": "Dining Table / Kitchen Island / Feature Wall / Stair Treads",
  "price": "900-1200",
  "sourceDir": "images/Amazon Green",
  "hero": "hero.JPG",
  "gallery": ["gallery1.JPG", "gallery2.JPG", "gallery3.JPG"]
}
```

### Step 2 — `scripts/import-catalog.mjs` (Node, follows `migrate-stones.mjs`)

Reuses the existing patterns: `.env` loader, `STRAPI_URL`/`STRAPI_API_TOKEN`,
`fetch`, `FormData` upload. **Dry-run by default**; mutates only with `--confirm`.

Phases:

1. **Delete** — page through `/api/stones` (populate `image`, `gallery`),
   collect attached media IDs, `DELETE` each stone, then `DELETE` each media
   file via `/api/upload/files/:id` (Cloudinary provider removes the remote asset).
2. **Categories** — for each unique category name (`Sintered Stone`, `Marble`),
   find by slug or create a `stone-category` (`name`, `slug`).
3. **Import** — per manifest entry: upload `hero` → `image`, upload each gallery
   file → `gallery[]`, create the stone (all fields + `slug` + `category` id,
   `en` locale), then publish it.

**Upload filenames** are slug-prefixed and sanitised — `amazon-green-hero.jpg`,
`amazon-green-gallery1.jpg` — so the 21 identical `hero.JPG` names don't collide
and Cloudinary public IDs stay meaningful.

**Safety:** dry-run prints the full plan (deletes + creates) without writing.
Targets whatever `STRAPI_URL` resolves to (default `http://localhost:1337`).
`--confirm` required to mutate. Token needs write+delete on `stone`,
`stone-category`, and `upload`.

## Schema change (CMS repo)

Add to `culturestone-cms/src/api/stone/content-types/stone/schema.json`:

```json
"price": {
  "type": "string",
  "pluginOptions": { "i18n": { "localized": false } }
}
```

Restart Strapi (`npm run develop`) to auto-migrate the DB before importing.

## The "2nd provider" — already in place

`config/plugins.ts` sets the upload provider to **Cloudinary**; credentials are
in `culturestone-cms/.env`; CSP already allows `res.cloudinary.com`; the frontend
`resolveStrapiMedia()` already handles absolute Cloudinary URLs. No new infra —
uploading through Strapi's API automatically offloads to Cloudinary.

## Run order

1. Add `price` field → restart Strapi to migrate DB.
2. `python scripts/build-catalog-manifest.py` → review `catalog.json`.
3. `node scripts/import-catalog.mjs` (dry-run) → review the plan.
4. `node scripts/import-catalog.mjs --confirm` → wipe + import (local Strapi).
5. Verify in Strapi admin + frontend catalog.
6. Deploy/transfer to production separately.

## Out of scope

- Chinese (`zh`) translations — manual later.
- Production deployment / data transfer.
- Editorial metadata in `data/signatureStonePageDetails.ts` (separate concern).

## Files touched

- **New:** `culturestone/scripts/build-catalog-manifest.py`
- **New:** `culturestone/scripts/import-catalog.mjs`
- **New (generated):** `culturestone/scripts/catalog.json`
- **Edit:** `culturestone-cms/src/api/stone/content-types/stone/schema.json` (+ `price`)
- **Append:** both `migration.md` files
