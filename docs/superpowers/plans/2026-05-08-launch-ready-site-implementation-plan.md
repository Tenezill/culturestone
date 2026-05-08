# Launch-ready commercial site (Iteration A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a launch-ready luxury brochure + catalog + inquiry flow for EU-wide audiences (EN/DE/FR/ES), with no placeholders and no B2B portal features.

**Architecture:** Nuxt 4 renders the site and fetches stone content from Strapi v5. Marketing pages remain repo-authored for v1, while stone data and media are managed in Strapi. Inquiries are captured via Netlify Forms and supported by a direct email path.

**Tech Stack:** Nuxt 4 (Vue 3 + TS), Tailwind, `@nuxtjs/i18n`, `@nuxtjs/strapi` (v5), `@nuxtjs/sitemap`, Netlify Forms, Cloudinary via Strapi media.

---

## File map (what we will touch)

- **Modify** `c:\programming\chengfeng\culturestone\pages\index.vue`
  - Replace remaining Unsplash images with owned/local assets under `public/img/`
  - Ensure og/twitter images are non-placeholder and consistent
- **Modify** `c:\programming\chengfeng\culturestone\pages\contact.vue`
  - Replace left-panel Unsplash image with owned/local asset
  - Remove phone contact surface (email only)
  - Keep (and potentially strengthen) mailto affordance for “tracked inquiries”
- **Modify** `c:\programming\chengfeng\culturestone\app.vue`
  - Remove or replace `href="#"` location links in mobile nav (no dead links at launch)
- **Modify** `c:\programming\chengfeng\culturestone\components\EditorialFooter.vue`
  - Remove or replace `href="#"` location links (no dead links at launch)
- **Verify** `c:\programming\chengfeng\culturestone\composables\useSignatureStones.ts`
  - Confirm `resolveStrapiMedia` / `pickMediaUrl` correctly handle Cloudinary absolute URLs (no code change unless needed)
- **Verify** `c:\programming\chengfeng\culturestone\.env` + deployment env
  - Production variables: `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_STRAPI_URL` (or `STRAPI_URL`)

---

### Task 1: Remove placeholder (Unsplash) imagery from Home

**Files:**
- Modify: `c:\programming\chengfeng\culturestone\pages\index.vue`

- [ ] **Step 1: Replace Unsplash URLs with local images already in `public/img/`**

Replace:
- `https://images.unsplash.com/photo-1518640467707-6811f4a6ab73...`
- `https://images.unsplash.com/photo-1600566752355-35792bedcfea...`
- `https://images.unsplash.com/photo-1550053808-52a75a05955d...`
- `https://images.unsplash.com/photo-1719107647328-dd2134da4fa7...`
- `https://images.unsplash.com/photo-1764021995962-53921e9f2317...`

With these local assets (already present in repo):
- `/img/ai-rock-formation.jpg`
- `/img/ai-veined-stone.jpg`
- `/img/ai-dark-marble.jpg`
- `/img/ai-light-marble.jpg`
- `/img/ai-blue-green.jpg`

Concrete edit example (one of the hero images):

```vue
<img
  src="/img/ai-rock-formation.jpg"
  alt="Raw stone formation with dramatic strata"
  class="h-[80vh] w-full object-cover"
  width="4096"
  height="2731"
  loading="lazy"
>
```

Do this for each of the existing Unsplash `<img>` tags in `pages/index.vue`.

- [ ] **Step 2: Update `useSeoMeta` `ogImage`/`twitterImage` if needed**

Keep `ogImage`/`twitterImage` on Home pointing to a non-placeholder local hero (or a real brand image if you replace it later). Example:

```ts
useSeoMeta({
  // ...
  ogImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
  twitterImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
})
```

- [ ] **Step 3: Manual verification**

Run:

```bash
npm run dev
```

Then check Home page:
- No image requests to `images.unsplash.com` in browser devtools Network tab
- All images render without layout shift (aspect classes already used in places)

- [ ] **Step 4: Commit**

```bash
git add pages/index.vue
git commit -m "fix: replace home page placeholder imagery"
```

---

### Task 2: Remove placeholder imagery + phone surface from Contact; keep email-first inquiry

**Files:**
- Modify: `c:\programming\chengfeng\culturestone\pages\contact.vue`

- [ ] **Step 1: Replace the left-panel Unsplash image**

Replace the existing `<img src="https://images.unsplash.com/...">` at the top of the left panel with a local asset. Example:

```vue
<img
  src="/img/ai-rock-formation.jpg"
  alt="Stone formation"
  class="absolute inset-0 h-full w-full object-cover opacity-55"
  width="4096"
  height="2731"
>
```

- [ ] **Step 2: Remove the phone block (no `tel:` link in v1)**

Delete the section:

```vue
<div>
  <p class="font-sans text-[0.5rem] uppercase tracking-[0.5em] text-editorial-cream/30">
    {{ t('contact.info.phone_label') }}
  </p>
  <a href="tel:+8615196266588" class="mt-2 block ...">
    +86 151 9626 6588
  </a>
</div>
```

Keep the email block and consider making it slightly more prominent than the studio locations (no code change required unless desired).

- [ ] **Step 3: Add an “email alternative” hint near the submit button**

Add a short line under the privacy note, e.g.:

```vue
<p class="mt-4 font-sans text-[0.55rem] leading-[1.85] text-editorial-cream/28">
  Prefer email? Write to
  <a
    href="mailto:inquiries@culturestone.eu"
    class="underline decoration-editorial-cream/18 underline-offset-4 hover:decoration-editorial-cream/45"
  >inquiries@culturestone.eu</a>.
</p>
```

If you localize this line, add new i18n keys in both `locales/*.json` and `i18n/locales/*.json` for EN/DE/FR/ES (keep them consistent).

- [ ] **Step 4: Manual verification**

Run:

```bash
npm run dev
```

Then check:
- Contact loads and the form still submits (no console errors)
- No `tel:` links are present
- No image requests to `images.unsplash.com`

- [ ] **Step 5: Commit**

```bash
git add pages/contact.vue locales/*.json i18n/locales/*.json
git commit -m "fix: make contact email-first and remove phone"
```

---

### Task 3: Remove dead “location” links (`href="#"`) from nav/footer

**Files:**
- Modify: `c:\programming\chengfeng\culturestone\app.vue`
- Modify: `c:\programming\chengfeng\culturestone\components\EditorialFooter.vue`

- [ ] **Step 1: Mobile nav (`app.vue`)**

Replace the `href="#"` location anchors with plain text (or remove the row entirely). Example:

```vue
<li class="pt-2 text-[0.65rem] tracking-[0.2em] text-editorial-charcoal/65">
  <span class="underline decoration-editorial-charcoal/30 underline-offset-4">
    {{ t('nav.locations.new_york') }}
  </span>
  &middot;
  <span class="underline decoration-editorial-charcoal/30 underline-offset-4">
    {{ t('nav.locations.london') }}
  </span>
</li>
```

This keeps the “we have locations” vibe without shipping dead links.

- [ ] **Step 2: Footer (`EditorialFooter.vue`)**

Apply the same idea (convert the two anchors to non-links or remove them). Example:

```vue
<span class="underline decoration-editorial-charcoal/30 underline-offset-4">
  {{ t('footer.locations.new_york') }}
</span>
&middot;
<span class="underline decoration-editorial-charcoal/30 underline-offset-4">
  {{ t('footer.locations.london') }}
</span>
```

- [ ] **Step 3: Manual verification**

Run:

```bash
npm run dev
```

Then:
- Mobile menu opens; no dead links to `#` remain
- Footer renders with no clickable “location” anchors

- [ ] **Step 4: Commit**

```bash
git add app.vue components/EditorialFooter.vue
git commit -m "fix: remove dead location links"
```

---

### Task 4: Confirm Cloudinary media works end-to-end (Strapi → Nuxt)

**Files:**
- Verify: `c:\programming\chengfeng\culturestone\composables\useSignatureStones.ts`
- Verify: `c:\programming\chengfeng\culturestone\pages\catalog\[slug].vue`

- [ ] **Step 1: Inspect `pickMediaUrl` behavior**

Confirm `pickMediaUrl` returns:
- absolute Cloudinary URLs unchanged, or
- correctly resolved absolute URLs via `resolveStrapiMedia(...)`

If Cloudinary is used, the URLs should typically already be absolute (e.g. `https://res.cloudinary.com/...`), and the resolver should be a no-op.

- [ ] **Step 2: Manual verification against real Strapi data**

Run the full stack locally:

```bash
npm run dev:all
```

Then open:
- `/catalog`
- a stone detail page `/catalog/<slug>`

Verify:
- hero image loads from Cloudinary
- gallery images (if present) load from Cloudinary
- “Inquire” CTA pre-fills the contact form’s “Stone(s) of interest” field (already implemented via `?stone=...`)

- [ ] **Step 3: Commit (only if code changes were required)**

If no code change was required, skip committing.

---

### Task 5: Production readiness checks (environment + Netlify Forms)

**Files:**
- Verify: `c:\programming\chengfeng\culturestone\.env`
- Configure in hosting: Netlify environment variables

- [ ] **Step 1: Ensure production env vars exist**

Set in Netlify (Site settings → Environment variables):
- `NUXT_PUBLIC_SITE_URL=https://culturestone.eu`
- `NUXT_PUBLIC_STRAPI_URL=<your Strapi base URL (no trailing slash)>`

- [ ] **Step 2: Verify Netlify Forms**

Deploy and submit the contact form once.

Expected:
- Submission appears under Netlify → Forms

- [ ] **Step 3: Verify SEO endpoints**

On production, request:
- `/robots.txt` (sitemap points at `https://culturestone.eu/sitemap.xml`)
- `/sitemap.xml`
- `/llms.txt`

Expected:
- 200 responses
- Correct canonical domain

---

## Plan self-review checklist (done)

- Spec coverage: images, inquiry CTA, email-first contact, no dead links, EU-wide i18n, Cloudinary media, production verification.
- Placeholder scan: no “TBD/TODO” steps; uses existing local image assets.
- Consistency: uses existing query-based prefill (`?stone=`) already in code.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-08-launch-ready-site-implementation-plan.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration  
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?

