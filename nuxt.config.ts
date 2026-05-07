// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Use project root as srcDir so `pages/`, `components/`, and `composables/` at the repo root are picked up.
  // Otherwise Nuxt 4 defaults `srcDir` to `./app/` when `app/app.vue` exists, and only `app/pages/` would register routes.
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { property: 'og:site_name', content: 'Culture Stone' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@culturestone' },
      ],
      link: [
        // Modern browsers prefer the PNG variants; /favicon.ico remains as
        // the legacy fallback served automatically from /public.
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/strapi', '@nuxtjs/sitemap'],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://culturestone.eu',
  },
  sitemap: {
    strictNuxtContentPaths: false,
  },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://culturestone.eu',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    seo: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
  },
  strapi: {
    // Base URL of the Strapi backend (no trailing slash, no /api).
    url: (process.env.NUXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, ''),
    prefix: '/api',
    // Local Strapi is v5 (flat responses, documentId). Keep in sync with backend.
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt',
  },
  runtimeConfig: {
    public: {
      // Set NUXT_PUBLIC_SITE_URL in production (e.g. https://culturestone.eu).
      // Used for absolute URLs in JSON-LD schema and OG tags.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://culturestone.eu',
      strapi: {
        // Ensure runtimeConfig is also populated with the normalized URL.
        // Nuxt automatically maps NUXT_PUBLIC_STRAPI_URL to this.
        url: (process.env.NUXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://localhost:1337').replace(/\/$/, ''),
      }
    }
  },
  googleFonts: {
    // Download font files at build time and self-host them to avoid leaking
    // visitor IPs to Google servers (GDPR / LG München I, Az. 3 O 17493/20).
    download: true,
    inject: true,
    display: 'swap',
    families: {
      Inter: [300, 400, 500, 600],
      'Playfair Display': {
        wght: [400, 500, 600, 700],
        ital: [400],
      },
    },
  },
})