// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Use project root as srcDir so `pages/`, `components/`, and `composables/` at the repo root are picked up.
  // Otherwise Nuxt 4 defaults `srcDir` to `./app/` when `app/app.vue` exists, and only `app/pages/` would register routes.
  srcDir: '.',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
        },
      ],
    },
  },
})