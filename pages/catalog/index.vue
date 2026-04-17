<template>
  <div>
    <header class="border-b border-editorial-charcoal/10 px-4 py-10 md:px-8 md:py-12 lg:px-12 lg:py-14">
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
      <section class="px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36" aria-labelledby="catalog-gallery-heading">
        <div class="mx-auto max-w-[1600px]">
          <h1
            id="catalog-gallery-heading"
            class="mb-20 max-w-4xl font-serif text-4xl font-normal leading-[1.1] tracking-tight text-editorial-charcoal sm:mb-24 sm:text-5xl md:mb-32 md:text-6xl lg:mb-40 lg:text-7xl xl:text-8xl"
          >
            The Signature Gallery
          </h1>

          <div class="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6 lg:grid-cols-5">
            <article
              v-for="stone in signatureStones"
              :key="stone.name"
              class="group"
            >
              <NuxtLink
                :to="`/catalog/${signatureStoneSlug(stone.name)}`"
                class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal"
              >
                <figure class="m-0">
                  <div class="overflow-hidden bg-editorial-charcoal/[0.03]">
                    <img
                      :src="stone.src"
                      :alt="stone.name"
                      class="aspect-square w-full object-cover transition duration-700 ease-out group-hover:scale-[1.02] group-hover:opacity-[0.92]"
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
              </NuxtLink>
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
