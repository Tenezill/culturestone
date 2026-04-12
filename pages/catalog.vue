<template>
  <div>
    <header
      class="border-b border-editorial-charcoal/10 px-6 py-12 sm:px-10 sm:py-14 md:px-14 md:py-16 lg:px-20 lg:py-20"
    >
      <div
        class="mx-auto flex max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-12"
      >
        <NuxtLink
          to="/"
          class="font-serif text-[0.65rem] uppercase tracking-[0.45em] text-editorial-charcoal/60 transition-colors hover:text-editorial-charcoal sm:text-xs"
        >
          Culture Stone
        </NuxtLink>
        <p class="font-sans text-[0.65rem] uppercase tracking-[0.35em] text-editorial-charcoal/45">
          Catalog
        </p>
      </div>
    </header>

    <main>
      <section
        class="px-6 pb-32 pt-20 sm:px-10 sm:pb-40 sm:pt-24 md:px-14 md:pb-48 md:pt-28 lg:px-20 lg:pb-56 lg:pt-32 xl:px-28 xl:pb-64 xl:pt-36"
        aria-labelledby="catalog-gallery-heading"
      >
        <div class="mx-auto max-w-[1600px]">
          <h1
            id="catalog-gallery-heading"
            class="mb-20 max-w-4xl font-serif text-4xl font-normal leading-[1.1] tracking-tight text-editorial-charcoal sm:mb-24 sm:text-5xl md:mb-32 md:text-6xl lg:mb-40 lg:text-7xl xl:text-8xl"
          >
            The Signature Gallery
          </h1>

          <div
            class="columns-2 gap-x-10 gap-y-0 md:columns-3 md:gap-x-12 lg:columns-4 [column-fill:_balance]"
          >
            <article
              v-for="stone in signatureStones"
              :key="stone.name"
              class="group mb-10 break-inside-avoid md:mb-12"
            >
              <figure class="m-0">
                <div class="overflow-hidden bg-editorial-charcoal/[0.03]">
                  <img
                    :src="stone.src"
                    :alt="stone.name"
                    :class="[
                      'w-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-[0.92]',
                      stone.aspect,
                    ]"
                    width="600"
                    height="750"
                    loading="lazy"
                    decoding="async"
                  >
                </div>
                <figcaption
                  class="mt-6 font-sans text-xs font-normal uppercase tracking-widest text-editorial-charcoal/55 transition-colors duration-500 group-hover:text-editorial-charcoal"
                >
                  {{ stone.name }}
                </figcaption>
              </figure>
            </article>
          </div>
        </div>
      </section>
    </main>

    <EditorialFooter secondary-href="/" secondary-label="Back to studio" />
  </div>
</template>

<script setup lang="ts">
const signatureStones = useSignatureStones()

useHead({
  title: 'Catalog — The Signature Gallery',
  meta: [
    {
      name: 'description',
      content: 'Museum-style survey of signature stones from Culture Stone.',
    },
  ],
})
</script>
