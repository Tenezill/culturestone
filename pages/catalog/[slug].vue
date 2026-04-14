<template>
  <div class="min-h-screen bg-editorial-cream text-editorial-charcoal">
    <Transition appear name="luxury-enter">
      <div :key="page ? slug : 'not-found'" class="luxury-enter-root">
        <template v-if="page">
        <header class="border-b border-editorial-charcoal/10 px-8 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">
          <div class="mx-auto flex max-w-[1600px] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <NuxtLink
              to="/catalog"
              class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/50 transition-colors duration-300 hover:text-editorial-charcoal"
            >
              ← Back to Catalog
            </NuxtLink>
            <NuxtLink
              to="/"
              class="font-serif text-[0.65rem] uppercase tracking-[0.45em] text-editorial-charcoal/60 transition-colors duration-300 hover:text-editorial-charcoal sm:text-xs"
            >
              Culture Stone
            </NuxtLink>
          </div>
        </header>

        <section class="relative min-h-[60vh] w-full overflow-hidden md:min-h-[70vh]" aria-label="Stone hero">
          <img
            :src="page.stone.src"
            :alt="page.stone.name"
            class="absolute inset-0 h-full w-full object-cover"
            width="1600"
            height="1200"
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
                  {{ page.detail.subhead }}
                </p>
                <h1
                  :id="headingId"
                  class="mt-8 font-serif text-4xl font-normal leading-[1.05] tracking-tight sm:text-5xl md:text-[52px] md:leading-[52px] lg:text-[60px] lg:leading-[60px]"
                >
                  {{ page.stone.name }}
                </h1>
                <p class="mt-10 font-sans text-sm font-light uppercase tracking-[0.28em] text-editorial-charcoal/55">
                  Origin — {{ page.detail.origin }}
                </p>
                <NuxtLink
                  :to="inquireTo"
                  class="mt-14 inline-flex items-center justify-center bg-editorial-charcoal px-14 py-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-cream transition-colors duration-300 hover:bg-editorial-charcoal/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal"
                >
                  Inquire
                </NuxtLink>
              </div>

              <div class="md:col-span-7 lg:col-span-7">
                <div class="max-w-prose space-y-10">
                  <p class="font-sans text-base font-light leading-[1.9] text-editorial-charcoal/80 md:text-lg md:leading-[1.88]">
                    {{ page.detail.description }}
                  </p>
                </div>

                <div class="mt-20 max-w-prose">
                  <h2 class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/45">
                    Specifications
                  </h2>
                  <dl class="mt-10 divide-y divide-editorial-charcoal/10 border-t border-editorial-charcoal/10">
                    <div class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                      <dt class="font-sans text-[0.65rem] uppercase tracking-widest text-editorial-charcoal/50">
                        Finish
                      </dt>
                      <dd class="font-sans text-sm font-light leading-relaxed text-editorial-charcoal/85">
                        {{ page.detail.specs.finish }}
                      </dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                      <dt class="font-sans text-[0.65rem] uppercase tracking-widest text-editorial-charcoal/50">
                        Thickness
                      </dt>
                      <dd class="font-sans text-sm font-light leading-relaxed text-editorial-charcoal/85">
                        {{ page.detail.specs.thickness }}
                      </dd>
                    </div>
                    <div class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                      <dt class="font-sans text-[0.65rem] uppercase tracking-widest text-editorial-charcoal/50">
                        Applications
                      </dt>
                      <dd class="font-sans text-sm font-light leading-relaxed text-editorial-charcoal/85">
                        {{ page.detail.specs.applications }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
        </template>

        <div v-else class="flex min-h-[70vh] flex-col px-8 py-24 md:px-12 md:py-32">
        <NuxtLink
          to="/catalog"
          class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/50 transition-colors duration-300 hover:text-editorial-charcoal"
        >
          ← Back to Catalog
        </NuxtLink>
        <div class="mx-auto flex max-w-md flex-1 flex-col items-center justify-center text-center">
          <p class="font-serif text-3xl font-normal tracking-tight text-editorial-charcoal sm:text-4xl">
            Stone not found
          </p>
          <p class="mt-6 font-sans text-sm font-light leading-relaxed text-editorial-charcoal/55">
            This material is not in the Signature Gallery or the link may have changed
          </p>
          <NuxtLink
            to="/catalog"
            class="mt-12 border border-editorial-charcoal/25 px-10 py-3 font-sans text-[0.65rem] uppercase tracking-[0.28em] text-editorial-charcoal transition-colors duration-300 hover:border-editorial-charcoal hover:bg-editorial-charcoal hover:text-editorial-cream"
          >
            Return to catalog
          </NuxtLink>
        </div>
        </div>
      </div>
    </Transition>

    <EditorialFooter secondary-href="/catalog" secondary-label="Catalog" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
  const raw = route.params.slug
  if (typeof raw === 'string') {
    return raw
  }
  if (Array.isArray(raw)) {
    return raw[0] ?? ''
  }
  return ''
})

const stones = useSignatureStones()

const page = computed(() => {
  const s = slug.value
  if (!s) {
    return null
  }
  const stone = stones.find((st) => signatureStoneSlug(st.name) === s)
  if (!stone) {
    return null
  }
  return resolveSignatureStonePage(stone, s)
})

const headingId = 'stone-detail-heading'

const inquireTo = computed(() => {
  if (!page.value) {
    return '/contact'
  }
  return {
    path: '/contact',
    query: { stone: page.value.stone.name },
  }
})

useHead(() => {
  if (!page.value) {
    return {
      title: 'Stone not found — Culture Stone',
      meta: [{ name: 'description', content: 'The requested stone could not be found in the Signature Gallery.' }],
    }
  }
  return {
    title: `${page.value.stone.name} — Culture Stone`,
    meta: [
      {
        name: 'description',
        content: `${page.value.stone.name}. ${page.value.detail.description}`,
      },
    ],
  }
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
</style>
