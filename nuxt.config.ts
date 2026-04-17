// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Use project root as srcDir so `pages/`, `components/`, and `composables/` at the repo root are picked up.
  // Otherwise Nuxt 4 defaults `srcDir` to `./app/` when `app/app.vue` exists, and only `app/pages/` would register routes.
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
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