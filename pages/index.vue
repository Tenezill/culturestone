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
                  :src="featuredImg('blue-emerald')"
                  alt="Blue Emerald sintered stone — sapphire tones with dynamic veining"
                  class="h-[85vh] w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  width="1500"
                  height="1000"
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
                  :src="featuredImg('red-travertine')"
                  alt="Red Travertine sintered stone — warm russet tones with linear movement"
                  class="h-[45vh] w-full object-cover transition-transform duration-1000 hover:scale-105"
                  width="1500"
                  height="1000"
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
                <NuxtLink :to="localePath('/catalog/bulgari-black')" class="group relative block overflow-hidden">
                  <img
                    :src="featuredImg('bulgari-black')"
                    alt="Bulgari Black sintered stone — deep black ground with dramatic white veining"
                    class="aspect-[16/10] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width="1500"
                    height="1000"
                    loading="lazy"
                  >
                  <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </NuxtLink>
              </div>
              <div
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :visible-once="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                class="max-w-xl lg:col-span-4"
              >
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                  {{ t('home.lookbook.bulgari_black.label') }}
                </p>
                <h3 class="mt-6 font-serif text-3xl font-normal md:text-4xl">
                  {{ t('home.lookbook.bulgari_black.heading') }}
                </h3>
                <p class="mt-10 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/70 sm:text-base">
                  {{ t('home.lookbook.bulgari_black.body') }}
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
                  {{ t('home.lookbook.china_arabescato.label') }}
                </p>
                <h3 class="mt-6 font-serif text-3xl font-normal md:text-4xl">
                  {{ t('home.lookbook.china_arabescato.heading') }}
                </h3>
                <p class="mt-10 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/70 sm:text-base">
                  {{ t('home.lookbook.china_arabescato.body') }}
                </p>
              </div>
              <div
                v-motion
                :initial="{ opacity: 0, x: 40 }"
                :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000 } }"
                class="order-1 lg:order-2 lg:col-span-7 lg:col-start-6"
              >
                <NuxtLink :to="localePath('/catalog/china-arabescato')" class="group relative block overflow-hidden">
                  <img
                    :src="featuredImg('china-arabescato')"
                    alt="China Arabescato marble — clean white ground with dramatic grey veining"
                    class="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width="1500"
                    height="1000"
                    loading="lazy"
                  >
                  <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </NuxtLink>
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
                <NuxtLink :to="localePath('/catalog/hermes-grey')" class="group relative block overflow-hidden">
                  <img
                    :src="featuredImg('hermes-grey')"
                    alt="Hermes Grey marble — grey ground with white spider-web veining"
                    class="aspect-[16/9] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    width="1500"
                    height="1000"
                    loading="lazy"
                  >
                  <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </NuxtLink>
                <div
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :visible-once="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
                  class="mt-16 max-w-2xl"
                >
                  <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                    {{ t('home.lookbook.hermes_grey.label') }}
                  </p>
                  <h3 class="mt-6 font-serif text-3xl font-normal md:text-4xl">
                    {{ t('home.lookbook.hermes_grey.heading') }}
                  </h3>
                  <p class="mt-10 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/70 sm:text-base">
                    {{ t('home.lookbook.hermes_grey.body') }}
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
import { pickMediaUrl, type StrapiStone } from '~/composables/useSignatureStones'

const { t } = useI18n()
const localePath = useLocalePath()
const siteUrl = useSiteUrl()

// Real catalogue photos for the homepage editorial sections (the hero stays a
// curated local asset). Stones are fetched by slug from Strapi so the images
// survive catalogue re-imports — only the slugs need to stay stable. Content
// (image, name) is locale-independent here, so we always request `en`.
const featuredSlugs = ['blue-emerald', 'red-travertine', 'bulgari-black', 'china-arabescato', 'hermes-grey']
const { find } = useStrapi()
const { data: featuredData } = await useAsyncData('home-featured-stones', () =>
  find<StrapiStone>('stones', {
    filters: { slug: { $in: featuredSlugs } },
    populate: ['image'],
    fields: ['slug', 'name'],
    locale: 'en',
    pagination: { pageSize: 50 },
  }),
)

const stonesBySlug = computed<Record<string, StrapiStone>>(() => {
  const map: Record<string, StrapiStone> = {}
  for (const s of (featuredData.value?.data ?? []) as StrapiStone[]) map[s.slug] = s
  return map
})

const featuredImg = (slug: string) => pickMediaUrl(stonesBySlug.value[slug]?.image, 'large')

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
