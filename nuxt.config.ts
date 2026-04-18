// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Use project root as srcDir so `pages/`, `components/`, and `composables/` at the repo root are picked up.
  // Otherwise Nuxt 4 defaults `srcDir` to `./app/` when `app/app.vue` exists, and only `app/pages/` would register routes.
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
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
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxtjs/strapi'],
  strapi: {
    // Base URL of the Strapi backend (no trailing slash, no /api).
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    // Local Strapi is v5 (flat responses, documentId). Keep in sync with backend.
    version: 'v5',
    cookie: {},
    cookieName: 'strapi_jwt',
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