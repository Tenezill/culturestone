# Migration Log — culturestone (Frontend)

Track all major changes here: new dependencies, routing changes, API contract changes, design system updates, breaking config changes.

## Format
```
## YYYY-MM-DD — Short title
- What changed and why
- Any follow-up steps or caveats
```

---

## 2026-06-19 — Real catalogue import (32 stones, 3 batches)

- Added `scripts/build-catalog-manifest.py` — reads the client Excel sheets + photo folders in the repo parent (`images/`, `images_2/`, `images_3/`; batch 3's sheet is `stones_data3.xlsx`) and writes a reviewable `scripts/catalog.json`
- Added `scripts/import-catalog.mjs` — dry-run by default; `--confirm` deletes ALL stones + their attached media and recreates from the manifest, uploading photos (hero → `image`, `galleryN` → `gallery`) and publishing to the `en` locale. Targets `NUXT_PUBLIC_STRAPI_URL`; auth via `STRAPI_API_IMPORT_TOKEN` (falls back to `STRAPI_API_TOKEN`)
- Imported **32 stones** (17 Sintered Stone, 15 Marble) into production; all photos stored on Cloudinary
- Data handling: dropped the duplicate images_2 "Prada Green" (Marble); auto-fixed the "Exotic Green" description; normalized price ranges and `thickness` (`9mm`/`18mm`). Flagged (not fixed): `china-arabescato` has empty origin + alias typo "Big Flower White Marble i"
- Requires `STRAPI_API_IMPORT_TOKEN` with find/create/delete on stone, stone-category, and upload

## 2026-05-19 — Rename Slate / Flexible Stone categories in Strapi

- Renamed CMS categories on production: **Slate** → **Sintered Stone** (`sintered_stone`), **Flexible Stone** → **Ceramic Tile** (`ceramic_tile`)
- Added `scripts/rename-categories.mjs` for non-destructive Strapi renames (handles underscore/hyphen slug variants)
- Catalog sidebar uses `cat.name` from Strapi; `pages/catalog/index.vue` now refetches categories on each visit (`getCachedData: () => undefined`)

## 2026-05-05 — Catalog refresh and detail page upgrade

- Removed redundant secondary header from `pages/catalog/index.vue` (top nav already covers navigation)
- Replaced secondary header on `pages/catalog/[slug].vue` with a minimal "Back to catalog" link only
- Added `gallery` multi-image field to `StrapiStone` type; `populate` updated to include `['image', 'gallery']`
- Added "In Situ" gallery section on stone detail page: two-up grid (md+), single column mobile, `aspect-[4/3]`; section is hidden when no gallery images are uploaded
- New locale key `catalog.stone.gallery_heading` added to en/de/fr/es locales
- Readability lift: `font-light` → `font-normal` and opacity bumped on description, spec values, figcaptions, and not-found body text
- Origin re-treated: moved from faded uppercase label to hairline divider + serif italic below H1
- Warmed `editorial-cream` from `#FAFAFA` to `#F8F4EC` in `tailwind.config.ts`
- CMS: `gallery` field added to stone schema — run `npm run develop` in `culturestone-cms/` to apply migration

## 2026-05-05 — Add i18n: English, German, French, Spanish with language switcher

- Added `@nuxtjs/i18n@10.3.0` (Nuxt 4-compatible major)
- Configured `nuxt.config.ts`: `strategy: 'prefix_except_default'` → English at `/`, others at `/de/`, `/fr/`, `/es/`
- Created `locales/{en,de,fr,es}.json` with all UI strings (nav, headings, editorial copy, catalog labels, footer, SEO meta)
- New `components/LanguageSwitcher.vue`: dropdown in nav bar (desktop) and mobile drawer; shows locale code in trigger, full names in dropdown
- Updated all pages and components to use `useI18n()` `t()` for every user-visible string
- Stone content (name, description, finish, etc.) remains English-only — it comes from Strapi CMS; Strapi-level i18n is a separate concern
- Privacy/legal page body text stays English-only (scaffold with placeholder brackets, not ready for translation)
- Browser language detection enabled: visiting `/` auto-redirects to `/de/` etc. based on `Accept-Language` cookie

## 2026-04-28 — Catalog sidebar category filter

- Added category sidebar to `pages/catalog/index.vue`
- Desktop: vertical sticky list with dash-indicator active state
- Mobile: horizontal scrollable pill row
- Fetches `stone-categories` in parallel with stones; filters client-side via `filteredStones` computed
- Added `StrapiStoneCategory` type and `category`/`alias` fields to `StrapiStone` in `composables/useSignatureStones.ts`
- Stone grid columns adjusted: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5`

## 2026-04-28 — Catalog seed script added

- Added `scripts/migrate-catalog.mjs`: seeds 6 stone categories and 20 products into Strapi from the supplier catalog image
- Each stone gets an `alias` field (Chinese name) in addition to the English `name`
- Stones are published automatically after creation (uses `actions/publish` endpoint)
- Run with: `STRAPI_API_TOKEN=<token> node scripts/migrate-catalog.mjs`
- Requires CMS schema changes deployed first (see `culturestone-cms/migration.md` 2026-04-28 entry)

## 2026-04-29 — Reset stone categories to correct product lines

- Rewrote `scripts/migrate-catalog.mjs`: now deletes all existing stones + stone-categories, then creates 9 new category shells
- New categories: Marble, Extravagante Stone, Granite, Artificial Stone, Sintered Stone, PC Brick, Culture Stone, Ceramic Tile, PU Cultured Stone
- Stones will be added manually via Strapi admin panel
- Run with: `STRAPI_API_TOKEN=<token> node scripts/migrate-catalog.mjs` (Strapi must be running)

## 2026-04-28 — Initial CLAUDE.md + migration tracking added
- Added `CLAUDE.md` at repo root with architecture overview and dev commands
- Added this `migration.md` to track future major changes

## 2026-05-06 — Fix locale loss on navigation (localePath)

- All `NuxtLink :to` attributes were using hardcoded string paths (e.g. `'/catalog'`); when on a non-English locale like `/de/catalog`, any navigation dropped back to the English route
- Fixed by replacing every hardcoded path with `localePath(path)` from `useLocalePath()` composable
- Affected: `app.vue` (all nav links), `components/EditorialFooter.vue` (all footer links + `secondaryHref` prop), `pages/index.vue`, `pages/catalog/index.vue`, `pages/catalog/[slug].vue`, `pages/contact.vue`, `pages/legal.vue`, `pages/privacy.vue`

## 2026-05-07 — Contact page overhaul, placeholder fill, SEO files, and i18n fix

- **i18n bug fix**: `i18n/locales/{en,de,fr,es}.json` were missing all `contact.form.*`, `contact.info.*`, `contact.success.*` keys — Nuxt 4 auto-detects `i18n/locales/` and loads it exclusively, so missing keys rendered as raw strings. Complete rewrite of all 8 locale files (`i18n/locales/` + `locales/`) to be in sync with full content.
- **Contact form wired up**: replaced fake `setTimeout` in `handleSubmit` with Netlify Forms POST (`fetch('/', { method: 'POST', ... })`). Added `data-netlify="true"`, `name="contact"`, `netlify-honeypot="bot-field"` to `<form>` tag and hidden `<input type="hidden" name="form-name" value="contact">` inside form. No Netlify Functions needed.
- **Email replacement**: `studio@culturestone.example` → `inquiries@culturestone.eu` in `pages/contact.vue`, `pages/legal.vue`, `pages/privacy.vue`, `app.vue`, `components/EditorialFooter.vue`; `studio@culturestone.com` → `inquiries@culturestone.eu` in `composables/useSchema.ts`
- **Domain fix**: `https://culturestone.com` → `https://culturestone.eu` in `nuxt.config.ts` (3×) and `public/robots.txt` sitemap URL
- **Locations updated**: New York / London / Milan → Chengdu / Lyon across all locale files, `app.vue` mobile nav, `components/EditorialFooter.vue`, `pages/contact.vue`, `composables/useSchema.ts`
- **Legal page**: All bracketed placeholders filled — company name, address, legal rep (Luo Shasha 骆沙沙), credit code (91510100MA6CN9DD81), phone, hosting (Netlify), EU rep (Synertrade FR SAS, Lyon)
- **Privacy page**: All placeholders resolved — DPO: not required (option b); retention: 30 days; hosting: Netlify (US); CMS section simplified; international transfers updated for Netlify (US) + mainland China with SCCs + Art. 49 GDPR
- **Schema.org**: `composables/useSchema.ts` — added `telephone`, replaced fake location blocks with real Chengdu HQ and Lyon EU rep
- **New files**: `public/llms.txt` (AI crawler index), `PLACEHOLDER_AUDIT.md` (placeholder tracker with DONE/TODO status)

## 2026-05-06 — Open Graph, Twitter Card, sitemap, hreflang, and title improvements

- Added `@nuxtjs/sitemap` module; auto-generates `/sitemap.xml` from all app routes including dynamic stone catalog pages
- Added global `og:site_name`, `og:type`, `twitter:card`, `twitter:site` defaults in `nuxt.config.ts` app.head
- Activated `useLocaleHead({ addSeoAttributes: true })` in `app.vue` — now emits `<link rel="alternate" hreflang="...">` for all four locales (en/de/fr/es) and sets `lang` attribute on `<html>` on every page
- Added `useSeoMeta` to all pages (index, catalog, catalog/[slug], contact, legal, privacy) with `ogTitle`, `ogDescription`, `ogImage`, `ogUrl`, `ogType`, `twitterTitle`, `twitterDescription`, `twitterImage`
- Stone detail page: OG image uses the stone's Strapi hero image URL; falls back to default hero JPEG
- Default OG image: `/img/ai-hero-marble-interior.jpg` (already in `public/`)
- Strengthened page titles in all four active locale files (`locales/en|de|fr|es.json`): home now "Culture Stone — Luxury Marble & Stone Supplier", catalog now "Stone Catalog — The Signature Gallery | Culture Stone"
- Updated `public/robots.txt` to include `Sitemap:` directive pointing to `/sitemap.xml`
- Removed deprecated `nuxt-simple-sitemap` package (migrated to `@nuxtjs/sitemap`)

## 2026-05-06 — Schema.org structured data + meta description improvements
- Added `composables/useSchema.ts` with JSON-LD builder helpers: `buildOrganizationSchema`, `buildWebSiteSchema`, `buildBreadcrumbSchema`, `buildProductSchema`
- Injected global `Organization` + `WebSite` JSON-LD blocks in `app.vue` (present on every page)
- Added page-level JSON-LD: `WebPage` (homepage), `CollectionPage` + `BreadcrumbList` (catalog), `Product` + `BreadcrumbList` (stone detail), `ContactPage` + `BreadcrumbList` (contact)
- Stone detail meta description now truncated to 155 chars (was emitting full CMS description, often 200+ chars)
- Rewrote all four English meta descriptions in `i18n/locales/en.json` — now 130–160 chars with location and material-type signals
- Added `NUXT_PUBLIC_SITE_URL` to `runtimeConfig.public` (defaults to `https://culturestone.com`); set this env var in Netlify for correct absolute URLs in JSON-LD
- TODO before go-live: replace `studio@culturestone.example` placeholder email; add real street addresses to Organization location blocks; add `sameAs` social URLs to Organization schema
