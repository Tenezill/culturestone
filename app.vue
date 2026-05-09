<template>
  <div
    class="min-h-screen bg-editorial-cream text-editorial-charcoal font-sans antialiased selection:bg-editorial-charcoal/10"
  >
    <NoiseOverlay />
    <NuxtRouteAnnouncer />
    <header class="sticky top-0 z-50 border-b border-editorial-charcoal/5 bg-editorial-cream/80 backdrop-blur-xl">
      <nav class="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12" aria-label="Primary">
        <div class="flex items-center gap-6">
          <button
            type="button"
            class="group flex items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal transition-colors hover:text-editorial-charcoal/60"
            :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
            aria-controls="mobile-navigation"
            aria-label="Toggle utility menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <div class="relative h-4 w-5">
              <span 
                class="absolute left-0 block h-px w-5 bg-current transition-all duration-300"
                :class="isMobileMenuOpen ? 'top-2 rotate-45' : 'top-0'"
              />
              <span 
                class="absolute left-0 top-2 block h-px w-5 bg-current transition-opacity duration-300"
                :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
              />
              <span 
                class="absolute left-0 block h-px w-5 bg-current transition-all duration-300"
                :class="isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'"
              />
            </div>
            <span class="hidden sm:inline">{{ isMobileMenuOpen ? t('nav.close') : t('nav.menu') }}</span>
          </button>

          <NuxtLink
            :to="localePath('/')"
            class="font-serif text-[0.75rem] uppercase tracking-[0.5em] text-editorial-charcoal transition-colors hover:text-editorial-charcoal/60"
          >
            Culture Stone
          </NuxtLink>
        </div>

        <ul class="hidden items-center gap-10 text-[0.65rem] uppercase tracking-[0.3em] md:flex">
          <li>
            <NuxtLink :to="localePath('/')" class="group relative py-1 transition-colors hover:text-editorial-charcoal/60">
              {{ t('nav.home') }}
              <span class="absolute bottom-0 left-0 h-px w-0 bg-editorial-charcoal transition-all duration-500 group-hover:w-full" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/catalog')" class="group relative py-1 transition-colors hover:text-editorial-charcoal/60">
              {{ t('nav.catalog') }}
              <span class="absolute bottom-0 left-0 h-px w-0 bg-editorial-charcoal transition-all duration-500 group-hover:w-full" />
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/contact')" class="group relative py-1 transition-colors hover:text-editorial-charcoal/60">
              {{ t('nav.contact') }}
              <span class="absolute bottom-0 left-0 h-px w-0 bg-editorial-charcoal transition-all duration-500 group-hover:w-full" />
            </NuxtLink>
          </li>
          <li><LanguageSwitcher /></li>
        </ul>
      </nav>

      <div
        v-if="isMobileMenuOpen"
        id="mobile-navigation"
        v-motion
        :initial="{ opacity: 0, y: -10 }"
        :enter="{ opacity: 1, y: 0 }"
        class="border-t border-editorial-charcoal/5 px-6 py-10 md:px-12"
      >
        <ul class="mx-auto max-w-[1600px] space-y-6 text-[0.65rem] uppercase tracking-[0.3em]">
          <li><NuxtLink :to="localePath('/')" class="block py-2" @click="isMobileMenuOpen = false">{{ t('nav.home') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/catalog')" class="block py-2" @click="isMobileMenuOpen = false">{{ t('nav.catalog') }}</NuxtLink></li>
          <li><NuxtLink :to="localePath('/contact')" class="block py-2" @click="isMobileMenuOpen = false">{{ t('nav.contact') }}</NuxtLink></li>
          <li class="pt-6">
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { buildOrganizationSchema, buildWebSiteSchema, useSiteUrl } from '~/composables/useSchema'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const isMobileMenuOpen = ref(false)

const siteUrl = useSiteUrl()

// Emit hreflang alternate links + og:locale for all 4 locales on every page.
// Requires i18n.seo: true in nuxt.config.ts (already set).
const i18nHead = useLocaleHead({ seo: true })
useHead(computed(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nHead.value.link,
  meta: [
    ...(i18nHead.value.meta ?? []),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildOrganizationSchema(siteUrl)),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(buildWebSiteSchema(siteUrl)),
    },
  ],
})))

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
  },
)
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
