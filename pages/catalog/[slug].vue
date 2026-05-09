<template>
  <div class="min-h-screen bg-editorial-cream text-editorial-charcoal selection:bg-editorial-charcoal/10">
    <div v-if="page" class="relative">
      <div class="px-6 pt-10 md:px-12 md:pt-12 lg:px-20">
        <NuxtLink
          :to="localePath('/catalog')"
          class="group inline-flex items-center gap-4 font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/40 transition-colors duration-300 hover:text-editorial-charcoal"
        >
          <PhArrowLeft :size="14" class="transition-transform group-hover:-translate-x-1" />
          {{ t('catalog.back') }}
        </NuxtLink>
      </div>

      <header class="relative mt-12 min-h-[70vh] w-full overflow-hidden md:min-h-[85vh]">
        <div
          v-motion
          :initial="{ scale: 1.1, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { duration: 1200, ease: 'easeOut' } }"
          class="absolute inset-0"
        >
          <img
            :src="heroUrl"
            :alt="page.image?.alternativeText ?? page.name"
            class="h-full w-full object-cover"
            :width="page.image?.width ?? 1600"
            :height="page.image?.height ?? 1200"
            fetchpriority="high"
          >
        </div>
        <div class="absolute inset-0 bg-neutral-950/20" aria-hidden="true" />
      </header>

      <section class="px-6 py-32 md:px-12 md:py-48 lg:px-20 lg:py-56" :aria-labelledby="headingId">
        <div class="mx-auto max-w-[1600px]">
          <div class="grid grid-cols-1 gap-24 lg:grid-cols-12 lg:gap-32">
            <div class="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <div
                v-motion
                :initial="{ y: 20, opacity: 0 }"
                :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 800 } }"
              >
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-editorial-charcoal/40">
                  {{ page.subhead }}
                </p>
                <h1
                  :id="headingId"
                  class="mt-10 font-serif text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  {{ page.name }}
                </h1>
                
                <div class="mt-12 border-t border-editorial-charcoal/10 pt-10">
                  <p class="font-sans text-[0.55rem] uppercase tracking-[0.5em] text-editorial-charcoal/30">
                    {{ t('catalog.stone.origin_prefix') }}
                  </p>
                  <p class="mt-4 font-serif text-2xl italic text-editorial-charcoal md:text-3xl">
                    {{ page.origin }}
                  </p>
                </div>

                <NuxtLink
                  :to="inquireTo"
                  class="group mt-16 inline-flex items-center gap-4 border border-editorial-charcoal px-12 py-6 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-editorial-cream bg-editorial-charcoal transition-all duration-500 hover:bg-transparent hover:text-editorial-charcoal"
                >
                  {{ t('catalog.stone.inquire') }}
                  <PhArrowRight :size="16" class="transition-transform group-hover:translate-x-1" />
                </NuxtLink>
              </div>
            </div>

            <div class="lg:col-span-7">
              <div
                v-motion
                :initial="{ opacity: 0 }"
                :enter="{ opacity: 1, transition: { delay: 600, duration: 1000 } }"
                class="max-w-2xl space-y-12"
              >
                <p class="font-sans text-lg font-light leading-[1.9] text-editorial-charcoal/70 sm:text-xl md:text-2xl">
                  {{ page.description }}
                </p>

                <div class="pt-24">
                  <h2 class="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-editorial-charcoal/40">
                    {{ t('catalog.stone.spec_heading') }}
                  </h2>
                  <dl class="mt-12 divide-y divide-editorial-charcoal/5 border-t border-editorial-charcoal/5">
                    <div class="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr]">
                      <dt class="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                        {{ t('catalog.stone.finish') }}
                      </dt>
                      <dd class="font-sans text-base font-light text-editorial-charcoal/80">
                        {{ page.finish }}
                      </dd>
                    </div>
                    <div class="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr]">
                      <dt class="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                        {{ t('catalog.stone.thickness') }}
                      </dt>
                      <dd class="font-sans text-base font-light text-editorial-charcoal/80">
                        {{ page.thickness }}
                      </dd>
                    </div>
                    <div class="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 lg:grid-cols-[1fr_2fr]">
                      <dt class="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-editorial-charcoal/40">
                        {{ t('catalog.stone.applications') }}
                      </dt>
                      <dd class="font-sans text-base font-light text-editorial-charcoal/80">
                        {{ page.applications }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        v-if="galleryUrls.length"
        class="px-6 pb-32 md:px-12 md:pb-48 lg:px-20 lg:pb-56"
        :aria-label="t('catalog.stone.gallery_heading')"
      >
        <div class="mx-auto max-w-[1600px]">
          <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            <button
              v-for="(url, i) in galleryUrls"
              :key="url"
              v-motion
              :initial="{ opacity: 0, scale: 0.95 }"
              :visible-once="{ opacity: 1, scale: 1, transition: { delay: i * 100, duration: 1000 } }"
              type="button"
              class="group relative block w-full overflow-hidden"
              @click="openGalleryModal(i)"
            >
              <img
                :src="url"
                :alt="`${page.name} — Image ${i + 1}`"
                class="aspect-[4/3] w-full object-cover transition duration-1000 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              >
              <div class="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </button>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <h1 class="font-serif text-4xl font-normal text-editorial-charcoal sm:text-5xl">
        {{ t('catalog.not_found.heading') }}
      </h1>
      <p class="mt-8 font-sans text-lg font-light text-editorial-charcoal/60">
        {{ t('catalog.not_found.body') }}
      </p>
      <NuxtLink
        :to="localePath('/catalog')"
        class="mt-16 border border-editorial-charcoal px-12 py-5 font-sans text-[0.7rem] uppercase tracking-[0.3em] text-editorial-charcoal transition-all duration-500 hover:bg-editorial-charcoal hover:text-editorial-cream"
      >
        {{ t('catalog.return') }}
      </NuxtLink>
    </div>

    <EditorialFooter secondary-href="/catalog" :secondary-label="t('nav.catalog')" />

    <Teleport to="body">
      <div
        v-if="isGalleryModalOpen"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/95 backdrop-blur-md"
        @click="closeGalleryModal"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          class="absolute right-8 top-8 z-10 p-2 text-white/50 transition-colors hover:text-white"
          @click.stop="closeGalleryModal"
          aria-label="Close gallery"
        >
          <PhX :size="32" weight="light" />
        </button>

        <button
          v-if="currentGalleryIndex > 0"
          type="button"
          class="absolute left-8 top-1/2 z-10 -translate-y-1/2 p-4 text-white/30 transition-colors hover:text-white"
          @click.stop="prevGalleryImage"
          aria-label="Previous image"
        >
          <PhCaretLeft :size="48" weight="thin" />
        </button>

        <button
          v-if="currentGalleryIndex < galleryUrls.length - 1"
          type="button"
          class="absolute right-8 top-1/2 z-10 -translate-y-1/2 p-4 text-white/30 transition-colors hover:text-white"
          @click.stop="nextGalleryImage"
          aria-label="Next image"
        >
          <PhCaretRight :size="48" weight="thin" />
        </button>

        <div class="pointer-events-none flex h-full w-full items-center justify-center p-8 md:p-20">
          <img
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1 }"
            :key="currentGalleryIndex"
            :src="galleryUrls[currentGalleryIndex]"
            :alt="`${page?.name} — Gallery Image ${currentGalleryIndex + 1}`"
            class="pointer-events-auto max-h-full max-w-full object-contain shadow-2xl"
            @click.stop
          >
        </div>
      </div>
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
