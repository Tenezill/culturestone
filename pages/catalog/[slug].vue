<template>
  <div class="min-h-screen bg-editorial-cream text-editorial-charcoal">
    <Transition appear name="luxury-enter">
      <div :key="page ? slug : 'not-found'" class="luxury-enter-root">
        <template v-if="page">
        <div class="px-8 pt-6 md:px-12 md:pt-8">
          <NuxtLink
            :to="localePath('/catalog')"
            class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/50 transition-colors duration-300 hover:text-editorial-charcoal"
          >
            {{ t('catalog.back') }}
          </NuxtLink>
        </div>

        <section class="relative min-h-[60vh] w-full overflow-hidden md:min-h-[70vh]" aria-label="Stone hero">
          <img
            :src="heroUrl"
            :alt="page.image?.alternativeText ?? page.name"
            class="absolute inset-0 h-full w-full object-cover"
            :width="page.image?.width ?? 1600"
            :height="page.image?.height ?? 1200"
            fetchpriority="high"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" aria-hidden="true" />
        </section>

        <section class="px-8 py-24 md:py-28 lg:px-12 lg:py-32" :aria-labelledby="headingId">
          <div class="mx-auto max-w-[1600px]">
            <div class="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-24 lg:gap-24">
              <div class="md:col-span-5 md:self-start md:sticky md:top-24 lg:col-span-5">
                <p
                  class="font-sans text-[0.65rem] font-normal uppercase tracking-widest text-editorial-charcoal/45"
                >
                  {{ page.subhead }}
                </p>
                <h1
                  :id="headingId"
                  class="mt-8 font-serif text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl md:text-[52px] md:leading-[52px] lg:text-[60px] lg:leading-[60px]"
                >
                  {{ page.name }}
                </h1>
                <div class="mt-8 border-t border-editorial-charcoal/15 pt-6">
                  <p class="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-editorial-charcoal/45">
                    {{ t('catalog.stone.origin_prefix') }}
                  </p>
                  <p class="mt-2 font-serif text-xl italic text-editorial-charcoal md:text-2xl">
                    {{ page.origin }}
                  </p>
                </div>
                <NuxtLink
                  :to="inquireTo"
                  class="mt-14 inline-flex items-center justify-center bg-editorial-charcoal px-14 py-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-cream transition-colors duration-300 hover:bg-editorial-charcoal/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal"
                >
                  {{ t('catalog.stone.inquire') }}
                </NuxtLink>
              </div>

              <div class="md:col-span-7 lg:col-span-7">
                <div class="max-w-prose space-y-10">
                  <p class="font-sans text-base font-normal leading-[1.9] text-editorial-charcoal/90 md:text-lg md:leading-[1.88]">
                    {{ page.description }}
                  </p>
                </div>

                <div class="mt-20 max-w-prose">
                  <h2 class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/45">
                    {{ t('catalog.stone.spec_heading') }}
                  </h2>
                  <dl class="mt-10 divide-y divide-editorial-charcoal/10 border-t border-editorial-charcoal/10">
                    <div class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                      <dt class="font-sans text-[0.65rem] uppercase tracking-widest text-editorial-charcoal/50">
                        {{ t('catalog.stone.finish') }}
                      </dt>
                      <dd class="font-sans text-sm font-normal leading-relaxed text-editorial-charcoal">
                        {{ page.finish }}
                      </dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                      <dt class="font-sans text-[0.65rem] uppercase tracking-widest text-editorial-charcoal/50">
                        {{ t('catalog.stone.thickness') }}
                      </dt>
                      <dd class="font-sans text-sm font-normal leading-relaxed text-editorial-charcoal">
                        {{ page.thickness }}
                      </dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                      <dt class="font-sans text-[0.65rem] uppercase tracking-widest text-editorial-charcoal/50">
                        {{ t('catalog.stone.applications') }}
                      </dt>
                      <dd class="font-sans text-sm font-normal leading-relaxed text-editorial-charcoal">
                        {{ page.applications }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          v-if="galleryUrls.length"
          class="px-8 pb-24 md:px-12 md:pb-32"
          :aria-label="t('catalog.stone.gallery_heading')"
        >
          <div class="mx-auto max-w-[1600px]">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <button
                v-for="(url, i) in galleryUrls"
                :key="url"
                type="button"
                class="group relative block w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal"
                @click="openGalleryModal(i)"
              >
                <img
                  :src="url"
                  :alt="`${page.name} — Image ${i + 1}`"
                  class="aspect-[4/3] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-90"
                  loading="lazy"
                  decoding="async"
                >
              </button>
            </div>
          </div>
        </section>
        </template>

        <div v-else class="flex min-h-[70vh] flex-col px-8 py-24 md:px-12 md:py-32">
        <NuxtLink
          :to="localePath('/catalog')"
          class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/50 transition-colors duration-300 hover:text-editorial-charcoal"
        >
          {{ t('catalog.back') }}
        </NuxtLink>
        <div class="mx-auto flex max-w-md flex-1 flex-col items-center justify-center text-center">
          <p class="font-serif text-3xl font-normal tracking-tight text-editorial-charcoal sm:text-4xl">
            {{ t('catalog.not_found.heading') }}
          </p>
          <p class="mt-6 font-sans text-sm font-normal leading-relaxed text-editorial-charcoal/70">
            {{ t('catalog.not_found.body') }}
          </p>
          <NuxtLink
            :to="localePath('/catalog')"
            class="mt-12 border border-editorial-charcoal/25 px-10 py-3 font-sans text-[0.65rem] uppercase tracking-[0.28em] text-editorial-charcoal transition-colors duration-300 hover:border-editorial-charcoal hover:bg-editorial-charcoal hover:text-editorial-cream"
          >
            {{ t('catalog.return') }}
          </NuxtLink>
        </div>
        </div>
      </div>
    </Transition>

    <EditorialFooter secondary-href="/catalog" :secondary-label="t('nav.catalog')" />

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isGalleryModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-editorial-charcoal/95 backdrop-blur-sm"
          @click="closeGalleryModal"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            class="absolute right-6 top-6 z-10 p-2 text-editorial-cream/70 transition-colors hover:text-editorial-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-editorial-cream"
            @click.stop="closeGalleryModal"
            aria-label="Close gallery"
          >
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            v-if="currentGalleryIndex > 0"
            type="button"
            class="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-4 text-editorial-cream/50 transition-colors hover:text-editorial-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-editorial-cream md:left-8"
            @click.stop="prevGalleryImage"
            aria-label="Previous image"
          >
            <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            v-if="currentGalleryIndex < galleryUrls.length - 1"
            type="button"
            class="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-4 text-editorial-cream/50 transition-colors hover:text-editorial-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-editorial-cream md:right-8"
            @click.stop="nextGalleryImage"
            aria-label="Next image"
          >
            <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div class="pointer-events-none flex h-full w-full items-center justify-center p-4 md:p-12">
            <img
              :src="galleryUrls[currentGalleryIndex]"
              :alt="`${page?.name} — Gallery Image ${currentGalleryIndex + 1}`"
              class="pointer-events-auto max-h-full max-w-full object-contain shadow-2xl"
              @click.stop
            >
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { pickMediaUrl, type StrapiStone } from '~/composables/useSignatureStones'
import { buildBreadcrumbSchema, buildProductSchema, useSiteUrl } from '~/composables/useSchema'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const siteUrl = useSiteUrl()

const slug = computed(() => {
  const raw = route.params.slug
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw)) return raw[0] ?? ''
  return ''
})

// In Strapi v5, `findOne` expects a documentId (opaque id), not a slug. So
// we use `find` with a slug filter and take the first match. This is the
// idiomatic v5 pattern for slug-based routing. `populate` is required —
// v5 does not populate relations/media by default.
const { find } = useStrapi()

const { data } = await useAsyncData(
  () => `catalog-stone-${slug.value}`,
  () =>
    find<StrapiStone>('stones', {
      filters: { slug: { $eq: slug.value } },
      populate: ['image', 'gallery'],
      pagination: { pageSize: 1 },
    }),
  { watch: [slug] },
)

const page = computed<StrapiStone | null>(() => {
  const list = data.value?.data
  if (!Array.isArray(list) || list.length === 0) return null
  return list[0] ?? null
})

const heroUrl = computed(() =>
  page.value ? pickMediaUrl(page.value.image, 'large') : '',
)

const galleryUrls = computed<string[]>(() => {
  const items = page.value?.gallery
  if (!Array.isArray(items) || items.length === 0) return []
  return items.map(img => pickMediaUrl(img, 'large'))
})

const headingId = 'stone-detail-heading'

const inquireTo = computed(() => {
  if (!page.value) return localePath('/contact')
  return {
    path: localePath('/contact'),
    query: { stone: page.value.name },
  }
})

useHead(() => {
  if (!page.value) {
    return {
      title: `${t('catalog.not_found.heading')} — Culture Stone`,
    }
  }

  const breadcrumb = buildBreadcrumbSchema(siteUrl, [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: page.value.name, path: `/catalog/${page.value.slug}` },
  ])

  const product = buildProductSchema(siteUrl, page.value)

  return {
    title: `${page.value.name} — Culture Stone`,
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(breadcrumb),
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(product),
      },
    ],
  }
})

useSeoMeta(computed(() => {
  if (!page.value) {
    return {
      description: t('catalog.not_found.body'),
      ogTitle: `${t('catalog.not_found.heading')} — Culture Stone`,
      ogDescription: t('catalog.not_found.body'),
      ogImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
      ogUrl: `${siteUrl}/catalog`,
      ogType: 'website' as const,
      twitterTitle: `${t('catalog.not_found.heading')} — Culture Stone`,
      twitterDescription: t('catalog.not_found.body'),
      twitterImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
    }
  }

  const description = page.value.description.length > 155
    ? `${page.value.description.slice(0, 152)}…`
    : page.value.description

  const heroImage = pickMediaUrl(page.value.image, 'large') || `${siteUrl}/img/ai-hero-marble-interior.jpg`

  return {
    description,
    ogTitle: `${page.value.name} — Culture Stone`,
    ogDescription: description,
    ogImage: heroImage,
    ogUrl: `${siteUrl}/catalog/${page.value.slug}`,
    ogType: 'website' as const,
    twitterTitle: `${page.value.name} — Culture Stone`,
    twitterDescription: description,
    twitterImage: heroImage,
  }
}))

// Gallery Modal State & Logic
const isGalleryModalOpen = ref(false)
const currentGalleryIndex = ref(0)

const openGalleryModal = (index: number) => {
  currentGalleryIndex.value = index
  isGalleryModalOpen.value = true
}

const closeGalleryModal = () => {
  isGalleryModalOpen.value = false
}

const nextGalleryImage = () => {
  if (currentGalleryIndex.value < galleryUrls.value.length - 1) {
    currentGalleryIndex.value++
  }
}

const prevGalleryImage = () => {
  if (currentGalleryIndex.value > 0) {
    currentGalleryIndex.value--
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isGalleryModalOpen.value) return
  if (e.key === 'Escape') closeGalleryModal()
  if (e.key === 'ArrowRight') nextGalleryImage()
  if (e.key === 'ArrowLeft') prevGalleryImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.luxury-enter-active {
  transition:
    opacity 1s cubic-bezier(0.22, 1, 0.36, 1),
    transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.luxury-enter-from {
  opacity: 0;
  transform: translateY(18px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
