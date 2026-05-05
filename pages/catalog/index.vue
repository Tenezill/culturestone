<template>
  <div>
    <main>
      <section class="px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36" aria-labelledby="catalog-gallery-heading">
        <div class="mx-auto max-w-[1600px]">
          <h1
            id="catalog-gallery-heading"
            class="mb-20 max-w-4xl font-serif text-4xl font-normal leading-[1.1] tracking-tight text-editorial-charcoal sm:mb-24 sm:text-5xl md:mb-32 md:text-6xl lg:mb-40 lg:text-7xl xl:text-8xl"
          >
            {{ t('catalog.page_title') }}
          </h1>

          <p
            v-if="pending"
            class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/45"
          >
            {{ t('catalog.loading') }}
          </p>
          <p
            v-else-if="error"
            class="font-sans text-sm text-editorial-charcoal/70"
          >
            {{ t('catalog.error') }}
          </p>

          <div v-else class="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-20">

            <!-- Category sidebar -->
            <aside class="shrink-0 lg:w-44 xl:w-52" :aria-label="t('catalog.category_label')">

              <!-- Mobile: horizontal scroll pills -->
              <div class="flex gap-2 overflow-x-auto pb-2 lg:hidden">
                <button
                  type="button"
                  class="shrink-0 border px-4 py-1.5 font-sans text-[0.6rem] uppercase tracking-[0.3em] transition-colors duration-200"
                  :class="selectedCategory === null
                    ? 'border-editorial-charcoal bg-editorial-charcoal text-editorial-cream'
                    : 'border-editorial-charcoal/25 text-editorial-charcoal/55 hover:border-editorial-charcoal/55 hover:text-editorial-charcoal'"
                  @click="selectedCategory = null"
                >
                  {{ t('catalog.all') }}
                </button>
                <button
                  v-for="cat in categories"
                  :key="cat.slug"
                  type="button"
                  class="shrink-0 border px-4 py-1.5 font-sans text-[0.6rem] uppercase tracking-[0.3em] transition-colors duration-200"
                  :class="selectedCategory === cat.slug
                    ? 'border-editorial-charcoal bg-editorial-charcoal text-editorial-cream'
                    : 'border-editorial-charcoal/25 text-editorial-charcoal/55 hover:border-editorial-charcoal/55 hover:text-editorial-charcoal'"
                  @click="selectedCategory = cat.slug"
                >
                  {{ cat.name }}
                </button>
              </div>

              <!-- Desktop: vertical sticky list -->
              <nav class="sticky top-24 hidden lg:block" :aria-label="t('catalog.category_label')">
                <p class="mb-8 font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-charcoal/35">
                  {{ t('catalog.category_label') }}
                </p>
                <ul class="space-y-5">
                  <li>
                    <button
                      type="button"
                      class="group flex items-start text-left gap-3 font-sans text-[0.65rem] uppercase tracking-[0.35em] transition-colors duration-200"
                      :class="selectedCategory === null ? 'text-editorial-charcoal' : 'text-editorial-charcoal/45 hover:text-editorial-charcoal'"
                      @click="selectedCategory = null"
                    >
                      <span
                        class="block h-px w-4 shrink-0 mt-1 transition-all duration-200"
                        :class="selectedCategory === null ? 'bg-editorial-charcoal' : 'bg-transparent group-hover:bg-editorial-charcoal/30'"
                        aria-hidden="true"
                      />
                      <span class="flex-1">{{ t('catalog.all') }}</span>
                    </button>
                  </li>
                  <li v-for="cat in categories" :key="cat.slug">
                    <button
                      type="button"
                      class="group flex items-start text-left gap-3 font-sans text-[0.65rem] uppercase tracking-[0.35em] transition-colors duration-200"
                      :class="selectedCategory === cat.slug ? 'text-editorial-charcoal' : 'text-editorial-charcoal/45 hover:text-editorial-charcoal'"
                      @click="selectedCategory = cat.slug"
                    >
                      <span
                        class="block h-px w-4 shrink-0 mt-1 transition-all duration-200"
                        :class="selectedCategory === cat.slug ? 'bg-editorial-charcoal' : 'bg-transparent group-hover:bg-editorial-charcoal/30'"
                        aria-hidden="true"
                      />
                      <span class="flex-1">{{ cat.name }}</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </aside>

            <!-- Stone grid -->
            <div class="min-w-0 flex-1">
              <p
                v-if="filteredStones.length === 0"
                class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/45"
              >
                {{ t('catalog.empty') }}
              </p>
              <div
                v-else
                class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 xl:grid-cols-5"
              >
                <article
                  v-for="stone in filteredStones"
                  :key="stone.slug"
                  class="group"
                >
                  <NuxtLink
                    :to="(`/catalog/${stone.slug}`)"
                    class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal"
                  >
                    <figure class="m-0">
                      <div class="overflow-hidden bg-editorial-charcoal/[0.03]">
                        <img
                          :src="pickMediaUrl(stone.image, 'medium')"
                          :alt="stone.image?.alternativeText ?? stone.name"
                          class="aspect-square w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-[0.92]"
                          width="600"
                          height="600"
                          loading="lazy"
                          decoding="async"
                        >
                      </div>
                      <figcaption
                        class="mt-6 font-sans text-xs font-normal uppercase tracking-widest text-editorial-charcoal/70 transition-colors duration-500 group-hover:text-editorial-charcoal"
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

const { t } = useI18n()
const { find } = useStrapi()

const [{ data: catData }, { data, pending, error }] = await Promise.all([
  useAsyncData('catalog-categories', () =>
    find<StrapiStoneCategory>('stone-categories', { sort: ['name:asc'] }),
  ),
  useAsyncData('catalog-stones', () =>
    find<StrapiStone>('stones', {
      sort: ['name:asc'],
      populate: ['image', 'category'],
      pagination: { pageSize: 100 },
    }),
  ),
])

const categories = computed<StrapiStoneCategory[]>(() => {
  const raw = catData.value?.data
  return Array.isArray(raw) ? raw : []
})

const stones = computed<StrapiStone[]>(() => {
  const raw = data.value?.data
  return Array.isArray(raw) ? raw : []
})

const selectedCategory = ref<string | null>(null)

const filteredStones = computed<StrapiStone[]>(() => {
  if (!selectedCategory.value) return stones.value
  return stones.value.filter(s => s.category?.slug === selectedCategory.value)
})

useHead({
  title: t('seo.catalog.title'),
  meta: [
    {
      name: 'description',
      content: t('seo.catalog.description'),
    },
  ],
})
</script>
