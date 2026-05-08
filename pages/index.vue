<template>
  <div>
    <!-- 1. The Cover -->
    <header class="relative h-screen min-h-[100dvh] w-full overflow-hidden">
      <img
        src="/img/ai-hero-marble-interior.jpg"
        alt="Luxury marble interior"
        class="absolute inset-0 h-screen w-full object-cover"
        width="4096"
        height="2284"
        fetchpriority="high"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" aria-hidden="true" />

      <div
        class="relative z-10 flex min-h-[100dvh] flex-col justify-between px-4 pb-12 pt-8 md:px-8 md:pb-16 lg:px-12"
      >
        <NuxtLink
          :to="localePath('/')"
          class="font-serif text-[0.65rem] uppercase tracking-[0.45em] text-white/95 sm:text-xs md:tracking-[0.55em]"
        >
          Culture Stone
        </NuxtLink>

        <div class="max-w-xl rounded bg-black/40 p-6 backdrop-blur-sm md:max-w-2xl md:p-8">
          <h1
            class="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {{ t('home.hero.headline') }}
          </h1>
          <p class="mt-8 max-w-lg font-sans text-lg font-light leading-relaxed text-white/95 sm:text-xl md:text-2xl">
            {{ t('home.hero.subhead') }}
          </p>
        </div>
      </div>
    </header>

    <main>
      <!-- 2. The Editor's Letter -->
      <section
        class="px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36"
        aria-labelledby="editors-letter-heading"
      >
        <div class="mx-auto max-w-4xl">
          <p
            id="editors-letter-heading"
            class="mb-20 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/50 sm:mb-24 md:mb-32"
          >
            {{ t('home.editors_letter.label') }}
          </p>

          <blockquote
            class="mb-16 font-serif text-4xl font-normal leading-tight tracking-tight text-editorial-charcoal sm:mb-20 md:mb-24 lg:text-[60px] lg:leading-[60px]"
          >
            {{ t('home.editors_letter.pull_quote') }}
          </blockquote>

          <div class="max-w-3xl space-y-10 font-sans text-base font-light leading-[1.85] text-editorial-charcoal/80 sm:text-lg sm:leading-[1.9] md:text-xl md:leading-[1.88]">
            <p>{{ t('home.editors_letter.body_1') }}</p>
            <p>{{ t('home.editors_letter.body_2') }}</p>
          </div>
        </div>
      </section>

      <!-- 3. The Feature Spread -->
      <section
        class="border-t border-editorial-charcoal/[0.06] px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36"
        aria-labelledby="feature-spread-heading"
      >
        <div class="mx-auto max-w-[1400px]">
          <p
            id="feature-spread-heading"
            class="mb-16 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/50 sm:mb-20 md:mb-24 lg:mb-28"
          >
            {{ t('home.sourcing.label') }}
          </p>

          <div
            class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16"
          >
            <div class="lg:col-span-7 lg:col-start-1">
              <figure class="overflow-hidden">
                <img
                  src="/img/ai-rock-formation.jpg"
                  alt="Raw stone formation with dramatic strata"
                  class="h-[80vh] w-full object-cover"
                  width="1376"
                  height="768"
                  loading="lazy"
                >
              </figure>
            </div>

            <div
              class="flex flex-col justify-start lg:col-span-5 lg:col-start-8 lg:mt-24 xl:mt-32"
            >
              <figure class="overflow-hidden lg:ml-4 xl:ml-10">
                <img
                  src="/img/ai-veined-stone.jpg"
                  alt="Polished interior stone detail"
                  class="h-[40vh] w-full object-cover"
                  width="1376"
                  height="768"
                  loading="lazy"
                >
              </figure>

              <div
                class="mt-16 max-w-2xl font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:mt-20 sm:text-base lg:mt-24 lg:ml-2 xl:ml-6"
              >
                <p class="mb-6 font-serif text-2xl font-normal leading-snug text-editorial-charcoal md:text-3xl">
                  {{ t('home.sourcing.subhead') }}
                </p>
                <p>{{ t('home.sourcing.body') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. The Lookbook -->
      <section
        class="border-t border-editorial-charcoal/[0.06] px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36"
        aria-labelledby="lookbook-heading"
      >
        <div class="mx-auto max-w-[1400px]">
          <div class="mb-24 md:mb-32 lg:mb-40">
            <p
              id="lookbook-heading"
              class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/50"
            >
              {{ t('home.lookbook.label') }}
            </p>
            <h2 class="mt-6 font-serif text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
              {{ t('home.lookbook.heading') }}
            </h2>
          </div>

          <ul class="space-y-32 md:space-y-40 lg:space-y-48 xl:space-y-56">
            <li class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-16 xl:gap-x-20">
              <div class="lg:col-span-7 lg:col-start-1">
                <figure class="overflow-hidden">
                  <img
                    src="/img/ai-dark-marble.jpg"
                    alt="Dark marble surface with fine veining"
                    class="aspect-[5/4] w-full object-cover lg:min-h-[min(52vh,560px)]"
                    width="1376"
                    height="768"
                    loading="lazy"
                  >
                </figure>
              </div>
              <div class="max-w-2xl lg:col-span-4 lg:col-start-9 lg:pl-4">
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/45">
                  {{ t('home.lookbook.nero_marquina.label') }}
                </p>
                <h3 class="mt-5 font-serif text-3xl font-normal md:text-4xl">
                  {{ t('home.lookbook.nero_marquina.heading') }}
                </h3>
                <p class="mt-8 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:text-base">
                  {{ t('home.lookbook.nero_marquina.body') }}
                </p>
              </div>
            </li>

            <li class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-16 xl:gap-x-20">
              <div class="order-2 max-w-2xl lg:order-1 lg:col-span-4 lg:col-start-1 lg:pr-4">
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/45">
                  {{ t('home.lookbook.calacatta_oro.label') }}
                </p>
                <h3 class="mt-5 font-serif text-3xl font-normal md:text-4xl">
                  {{ t('home.lookbook.calacatta_oro.heading') }}
                </h3>
                <p class="mt-8 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:text-base">
                  {{ t('home.lookbook.calacatta_oro.body') }}
                </p>
              </div>
              <div class="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
                <figure class="overflow-hidden">
                  <img
                    src="/img/ai-light-marble.jpg"
                    alt="White marble with gold and grey veining"
                    class="aspect-[5/4] w-full object-cover lg:min-h-[min(52vh,560px)]"
                    width="1376"
                    height="768"
                    loading="lazy"
                  >
                </figure>
              </div>
            </li>

            <li class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-16 xl:gap-x-20">
              <div class="lg:col-span-7 lg:col-start-1">
                <figure class="overflow-hidden">
                  <img
                    src="/img/ai-blue-green.jpg"
                    alt="Textured grey granite surface"
                    class="aspect-[5/4] w-full object-cover lg:min-h-[min(52vh,560px)]"
                    width="1376"
                    height="768"
                    loading="lazy"
                  >
                </figure>
              </div>
              <div class="max-w-2xl lg:col-span-4 lg:col-start-9 lg:pl-4">
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/45">
                  {{ t('home.lookbook.caledonia.label') }}
                </p>
                <h3 class="mt-5 font-serif text-3xl font-normal md:text-4xl">
                  {{ t('home.lookbook.caledonia.heading') }}
                </h3>
                <p class="mt-8 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:text-base">
                  {{ t('home.lookbook.caledonia.body') }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <EditorialFooter />
  </div>
</template>

<script setup lang="ts">
import { buildBreadcrumbSchema, useSiteUrl } from '~/composables/useSchema'

const { t } = useI18n()
const localePath = useLocalePath()
const siteUrl = useSiteUrl()

const webPageSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: t('seo.home.title'),
  description: t('seo.home.description'),
  url: siteUrl,
  breadcrumb: buildBreadcrumbSchema(siteUrl, [{ name: 'Home', path: '/' }]),
  isPartOf: { '@type': 'WebSite', url: siteUrl },
}))

useHead({
  title: t('seo.home.title'),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(webPageSchema.value),
    },
  ],
})

useSeoMeta({
  description: t('seo.home.description'),
  ogTitle: t('seo.home.title'),
  ogDescription: t('seo.home.description'),
  ogImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
  ogUrl: siteUrl,
  ogType: 'website',
  twitterTitle: t('seo.home.title'),
  twitterDescription: t('seo.home.description'),
  twitterImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
})
</script>
