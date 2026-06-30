<template>
  <div>
    <main>
      <section class="px-6 py-32 md:px-12 md:py-48 lg:px-20 lg:py-56" aria-labelledby="catalog-gallery-heading">
        <div class="mx-auto max-w-[1600px]">
          <div
            v-motion
            :initial="{ y: 40, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { duration: 800 } }"
          >
            <h1
              id="catalog-gallery-heading"
              class="mb-32 max-w-5xl font-serif text-5xl font-normal leading-[1.05] tracking-tight text-editorial-charcoal sm:text-7xl md:text-8xl lg:text-9xl"
            >
              {{ t('catalog.page_title') }}
            </h1>
          </div>

          <p
            v-if="pending"
            class="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/60"
          >
            {{ t('catalog.loading') }}
          </p>
          <p
            v-else-if="error"
            class="font-sans text-sm text-editorial-charcoal/70"
          >
            {{ t('catalog.error') }}
          </p>

          <div v-else class="flex flex-col gap-24 lg:flex-row lg:gap-32">

            <!-- Category sidebar -->
            <aside class="shrink-0 lg:w-56" :aria-label="t('catalog.category_label')">
              <div
                v-motion
                class="lg:h-full"
                :initial="{ opacity: 0, x: -20 }"
                :enter="{ opacity: 1, x: 0, transition: { delay: 400, duration: 800 } }"
              >
                <!-- Mobile: horizontal scroll pills -->
                <div class="flex gap-4 overflow-x-auto pb-4 lg:hidden">
                  <button
                    type="button"
                    class="shrink-0 border-b-2 px-1 pb-2 font-sans text-[0.6rem] uppercase tracking-[0.3em] transition-all duration-300"
                    :class="selectedCategory === null
                      ? 'border-editorial-charcoal text-editorial-charcoal'
                      : 'border-transparent text-editorial-charcoal/60 hover:text-editorial-charcoal'"
                    @click="selectedCategory = null"
                  >
                    {{ t('catalog.all') }}
                  </button>
                  <button
                    v-for="cat in categories"
                    :key="cat.slug"
                    type="button"
                    class="shrink-0 border-b-2 px-1 pb-2 font-sans text-[0.6rem] uppercase tracking-[0.3em] transition-all duration-300"
                    :class="selectedCategory === cat.slug
                      ? 'border-editorial-charcoal text-editorial-charcoal'
                      : 'border-transparent text-editorial-charcoal/60 hover:text-editorial-charcoal'"
                    @click="selectedCategory = cat.slug"
                  >
                    {{ cat.name }}
                  </button>
                </div>

                <!-- Desktop: vertical sticky list -->
                <nav class="sticky top-32 hidden lg:block" :aria-label="t('catalog.category_label')">
                  <p class="mb-10 font-sans text-[0.55rem] uppercase tracking-[0.5em] text-editorial-charcoal/50">
                    {{ t('catalog.category_label') }}
                  </p>
                  <ul class="space-y-6">
                    <li>
                      <button
                        type="button"
                        class="group flex items-center gap-4 font-sans text-[0.65rem] uppercase tracking-[0.4em] transition-all duration-300"
                        :class="selectedCategory === null ? 'text-editorial-charcoal' : 'text-editorial-charcoal/60 hover:text-editorial-charcoal'"
                        @click="selectedCategory = null"
                      >
                        <span
                          class="block h-px transition-all duration-300"
                          :class="selectedCategory === null ? 'w-8 bg-editorial-charcoal' : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-editorial-charcoal/30'"
                          aria-hidden="true"
                        />
                        <span>{{ t('catalog.all') }}</span>
                      </button>
                    </li>
                    <li v-for="cat in categories" :key="cat.slug">
                      <button
                        type="button"
                        class="group flex items-center gap-4 font-sans text-[0.65rem] uppercase tracking-[0.4em] transition-all duration-300"
                        :class="selectedCategory === cat.slug ? 'text-editorial-charcoal' : 'text-editorial-charcoal/60 hover:text-editorial-charcoal'"
                        @click="selectedCategory = cat.slug"
                      >
                        <span
                          class="block h-px transition-all duration-300"
                          :class="selectedCategory === cat.slug ? 'w-8 bg-editorial-charcoal' : 'w-0 bg-transparent group-hover:w-4 group-hover:bg-editorial-charcoal/30'"
                          aria-hidden="true"
                        />
                        <span>{{ cat.name }}</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </aside>

            <!-- Stone grid -->
            <div class="min-w-0 flex-1">
              <p
                v-if="filteredStones.length === 0"
                class="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/60"
              >
                {{ t('catalog.empty') }}
              </p>
              <div
                v-else
                class="grid grid-cols-2 gap-x-8 gap-y-20 sm:grid-cols-3 md:gap-x-12 md:gap-y-24 xl:grid-cols-4"
              >
                <article
                  v-for="(stone, index) in filteredStones"
                  :key="stone.slug"
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: 400 + (index % 5) * 100, duration: 800 } }"
                  class="group"
                >
                  <NuxtLink
                    :to="localePath(`/catalog/${stone.slug}`)"
                    class="block"
                  >
                    <figure class="m-0">
                      <div class="relative overflow-hidden bg-editorial-charcoal/[0.03]">
                        <img
                          :src="pickMediaUrl(stone.image, 'medium')"
                          :alt="stone.image?.alternativeText ?? stone.name"
                          class="aspect-[4/5] w-full object-cover transition duration-1000 ease-out group-hover:scale-110"
                          width="600"
                          height="750"
                          loading="lazy"
                          decoding="async"
                        >
                        <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                      </div>
                      <figcaption
                        class="mt-8 font-sans text-[0.6rem] uppercase tracking-[0.3em] text-editorial-charcoal/70 transition-colors duration-500 group-hover:text-editorial-charcoal"
                      >
                        {{ stone.name }}
                      </figcaption>
                    </figure>
                  </NuxtLink>
                </article>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>

    <EditorialFooter secondary-href="/" :secondary-label="t('footer.back_to_studio')" />
  </div>
</template>

<script setup lang="ts">
import { pickMediaUrl, type StrapiStone, type StrapiStoneCategory } from '~/composables/useSignatureStones'
import { buildBreadcrumbSchema, useSiteUrl } from '~/composables/useSchema'

const { t } = useI18n()
const localePath = useLocalePath()
const { find } = useStrapi()

const [{ data: catData }, { data, pending, error }] = await Promise.all([
  useAsyncData(
    'catalog-categories',
    () => find<StrapiStoneCategory>('stone-categories', { sort: ['name:asc'] }),
    { getCachedData: () => undefined },
  ),
  useAsyncData('catalog-stones', () =>
    find<StrapiStone>('stones', {
      sort: ['name:asc'],
      populate: ['image', 'category'],
      pagination: { pageSize: 100 },
    }),
  ),
])

const stones = computed<StrapiStone[]>(() => {
  const raw = data.value?.data
  return Array.isArray(raw) ? raw : []
})

const categories = computed<StrapiStoneCategory[]>(() => {
  const raw = catData.value?.data
  const all = Array.isArray(raw) ? raw : []
  // Only show categories that have at least one stone in the catalog yet.
  const usedSlugs = new Set(
    stones.value.map(s => s.category?.slug).filter(Boolean),
  )
  return all.filter(c => usedSlugs.has(c.slug))
})

const selectedCategory = ref<string | null>(null)

const filteredStones = computed<StrapiStone[]>(() => {
  if (!selectedCategory.value) return stones.value
  return stones.value.filter(s => s.category?.slug === selectedCategory.value)
})

const siteUrl = useSiteUrl()

const catalogSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: t('catalog.page_title'),
  description: t('seo.catalog.description'),
  url: `${siteUrl}/catalog`,
  breadcrumb: buildBreadcrumbSchema(siteUrl, [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
  ]),
  isPartOf: { '@type': 'WebSite', url: siteUrl },
}))

useHead({
  title: t('seo.catalog.title'),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(catalogSchema.value),
    },
  ],
})

useSeoMeta({
  description: t('seo.catalog.description'),
  ogTitle: t('seo.catalog.title'),
  ogDescription: t('seo.catalog.description'),
  ogImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
  ogUrl: `${siteUrl}/catalog`,
  ogType: 'website',
  twitterTitle: t('seo.catalog.title'),
  twitterDescription: t('seo.catalog.description'),
  twitterImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
})
</script>
