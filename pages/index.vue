<template>
  <div>
    <!-- 1. The Cover -->
    <header class="relative min-h-[100dvh] w-full overflow-hidden">
      <div
        v-motion
        :initial="{ scale: 1.1, opacity: 0 }"
        :enter="{ scale: 1, opacity: 1, transition: { duration: 1200, ease: 'easeOut' } }"
        class="absolute inset-0"
      >
        <img
          src="/img/ai-hero-marble-interior.jpg"
          alt="Luxury marble interior"
          class="h-full w-full object-cover"
          width="4096"
          height="2284"
          fetchpriority="high"
        >
      </div>
      <div class="absolute inset-0 bg-neutral-950/40" aria-hidden="true" />

      <div
        class="relative z-10 flex min-h-[100dvh] flex-col justify-between px-6 pb-12 pt-8 md:px-12 md:pb-16 lg:px-20"
      >
        <NuxtLink
          :to="localePath('/')"
          class="w-fit font-serif text-[0.65rem] uppercase tracking-[0.55em] text-white/90 sm:text-xs"
        >
          Culture Stone
        </NuxtLink>

        <div class="max-w-4xl pb-24 md:pb-32 lg:pb-40">
          <div
            v-motion
            :initial="{ y: 40, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 800 } }"
          >
            <h1
              class="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
            >
              {{ t('home.hero.headline') }}
            </h1>
          </div>
          <div
            v-motion
            :initial="{ y: 20, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { delay: 600, duration: 800 } }"
          >
            <p class="mt-10 max-w-xl font-sans text-lg font-light leading-relaxed text-white/80 sm:text-xl md:text-2xl">
              {{ t('home.hero.subhead') }}
            </p>
          </div>
        </div>
      </div>
    </header>

    <main>
      <!-- 2. The Editor's Letter -->
      <section
        class="px-6 py-32 md:px-12 md:py-48 lg:px-20 lg:py-56"
        aria-labelledby="editors-letter-heading"
      >
        <div class="mx-auto max-w-5xl">
          <p
            id="editors-letter-heading"
            v-motion-fade-visible-once
            class="mb-24 font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/40 sm:mb-32"
          >
            {{ t('home.editors_letter.label') }}
          </p>

          <blockquote
            v-motion
            :initial="{ y: 40, opacity: 0 }"
            :visible-once="{ y: 0, opacity: 1, transition: { duration: 1000 } }"
            class="mb-20 font-serif text-4xl font-normal leading-tight tracking-tight text-editorial-charcoal sm:mb-28 lg:text-[72px] lg:leading-[1.1]"
          >
            {{ t('home.editors_letter.pull_quote') }}
          </blockquote>

          <div
            v-motion
            :initial="{ opacity: 0 }"
            :visible-once="{ opacity: 1, transition: { delay: 400, duration: 1000 } }"
            class="max-w-3xl space-y-12 font-sans text-base font-light leading-[1.9] text-editorial-charcoal/70 sm:text-lg md:text-xl"
          >
            <p>{{ t('home.editors_letter.body_1') }}</p>
            <p>{{ t('home.editors_letter.body_2') }}</p>
          </div>
        </div>
      </section>

      <!-- 3. The Feature Spread -->
      <section
        class="border-t border-editorial-charcoal/[0.08] px-6 py-32 md:px-12 md:py-48 lg:px-20 lg:py-56"
        aria-labelledby="feature-spread-heading"
      >
        <div class="mx-auto max-w-[1600px]">
          <p
            id="feature-spread-heading"
            v-motion-fade-visible-once
            class="mb-20 font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/40"
          >
            {{ t('home.sourcing.label') }}
          </p>

          <div
            class="grid grid-cols-1 gap-24 lg:grid-cols-12 lg:gap-x-20"
          >
            <div
              v-motion
              :initial="{ clipPath: 'inset(100% 0 0 0)' }"
              :visible-once="{ clipPath: 'inset(0% 0 0 0)', transition: { duration: 1200, ease: 'easeInOut' } }"
              class="lg:col-span-7"
            >
              <figure class="overflow-hidden">
                <img
                  src="/img/ai-rock-formation.jpg"
                  alt="Raw stone formation with dramatic strata"
                  class="h-[85vh] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  width="1376"
                  height="768"
                  loading="lazy"
                >
              </figure>
            </div>

            <div
              class="flex flex-col justify-start lg:col-span-5 lg:pt-32"
            >
              <figure
                v-motion
                :initial="{ opacity: 0, scale: 0.95 }"
                :visible-once="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 1000 } }"
                class="overflow-hidden"
              >
                <img
                  src="/img/ai-veined-stone.jpg"
                  alt="Polished interior stone detail"
                  class="h-[45vh] w-full object-cover transition-transform duration-1000 hover:scale-105"
                  width="1376"
                  height="768"
                  loading="lazy"
                >
              </figure>

              <div
                v-motion
                :initial="{ opacity: 0, x: 20 }"
                :visible-once="{ opacity: 1, x: 0, transition: { delay: 600, duration: 800 } }"
                class="mt-20 max-w-xl font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/70 sm:mt-24 sm:text-base lg:ml-12"
              >
                <p class="mb-8 font-serif text-3xl font-normal leading-snug text-editorial-charcoal md:text-4xl">
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
        class="border-t border-editorial-charcoal/[0.08] px-6 py-32 md:px-12 md:py-48 lg:px-20 lg:py-56"
        aria-labelledby="lookbook-heading"
      >
        <div class="mx-auto max-w-[1600px]">
          <div
            v-motion-fade-visible-once
            class="mb-32 md:mb-48"
          >
            <p
              id="lookbook-heading"
              class="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/40"
            >
              {{ t('home.lookbook.label') }}
            </p>
            <h2 class="mt-8 font-serif text-5xl font-normal tracking-tight md:text-6xl lg:text-7xl">
              {{ t('home.lookbook.heading') }}
            </h2>
          </div>

          <div class="grid grid-cols-1 gap-32 md:gap-48 lg:gap-64">
            <!-- Item 1: Wide Left -->
            <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-24">
              <div
                v-motion
                :initial="{ opacity: 0, x: -40 }"
                :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
                class="lg:col-span-8"
              >
                <figure class="group relative overflow-hidden">
                  <img
                    src="/img/ai-dark-marble.jpg"
                    alt="Dark marble surface with fine veining"
                    class="aspect-[16/10] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width="1376"
                    height="768"
                    loading="lazy"
                  >
                  <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </figure>
              </div>
              <div
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                class="max-w-xl lg:col-span-4"
              >
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                  {{ t('home.lookbook.nero_marquina.label') }}
                </p>
                <h3 class="mt-6 font-serif text-3xl font-normal md:text-4xl">
                  {{ t('home.lookbook.nero_marquina.heading') }}
                </h3>
                <p class="mt-10 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/70 sm:text-base">
                  {{ t('home.lookbook.nero_marquina.body') }}
                </p>
              </div>
            </div>

            <!-- Item 2: Offset Right -->
            <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-24">
              <div
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                class="order-2 max-w-xl lg:order-1 lg:col-span-4 lg:col-start-2"
              >
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                  {{ t('home.lookbook.calacatta_oro.label') }}
                </p>
                <h3 class="mt-6 font-serif text-3xl font-normal md:text-4xl">
                  {{ t('home.lookbook.calacatta_oro.heading') }}
                </h3>
                <p class="mt-10 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/70 sm:text-base">
                  {{ t('home.lookbook.calacatta_oro.body') }}
                </p>
              </div>
              <div
                v-motion
                :initial="{ opacity: 0, x: 40 }"
                :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
                class="order-1 lg:order-2 lg:col-span-7 lg:col-start-6"
              >
                <figure class="group relative overflow-hidden">
                  <img
                    src="/img/ai-light-marble.jpg"
                    alt="White marble with gold and grey veining"
                    class="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width="1376"
                    height="768"
                    loading="lazy"
                  >
                  <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </figure>
              </div>
            </div>

            <!-- Item 3: Centered Narrow -->
            <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-24">
              <div
                v-motion
                :initial="{ opacity: 0, scale: 0.95 }"
                :visible-once="{ opacity: 1, scale: 1, transition: { duration: 1000 } }"
                class="lg:col-span-8 lg:col-start-3"
              >
                <figure class="group relative overflow-hidden">
                  <img
                    src="/img/ai-blue-green.jpg"
                    alt="Textured grey granite surface"
                    class="aspect-[16/9] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width="1376"
                    height="768"
                    loading="lazy"
                  >
                  <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </figure>
                <div
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                  class="mt-16 max-w-2xl"
                >
                  <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                    {{ t('home.lookbook.caledonia.label') }}
                  </p>
                  <h3 class="mt-6 font-serif text-3xl font-normal md:text-4xl">
                    {{ t('home.lookbook.caledonia.heading') }}
                  </h3>
                  <p class="mt-10 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/70 sm:text-base">
                    {{ t('home.lookbook.caledonia.body') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
