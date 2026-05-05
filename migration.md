# Migration Log — culturestone (Frontend)

Track all major changes here: new dependencies, routing changes, API contract changes, design system updates, breaking config changes.

## Format
```
## YYYY-MM-DD — Short title
- What changed and why
- Any follow-up steps or caveats
```

---

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
- New categories: Marble, Extravagante Stone, Granite, Artificial Stone, Slate, PC Brick, Culture Stone, Flexible Stone, PU Cultured Stone
- Stones will be added manually via Strapi admin panel
- Run with: `STRAPI_API_TOKEN=<token> node scripts/migrate-catalog.mjs` (Strapi must be running)

## 2026-04-28 — Initial CLAUDE.md + migration tracking added
- Added `CLAUDE.md` at repo root with architecture overview and dev commands
- Added this `migration.md` to track future major changes
