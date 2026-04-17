<template>
  <div>
    <!-- 1. The Cover -->
    <header class="relative h-screen min-h-[100dvh] w-full overflow-hidden">
      <img
        src="/img/pexels-bathroom-marble.jpg"
        alt="Luxury marble interior"
        class="absolute inset-0 h-screen w-full object-cover"
        width="2000"
        height="1333"
        fetchpriority="high"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" aria-hidden="true" />

      <div
        class="relative z-10 flex min-h-[100dvh] flex-col justify-between px-4 pb-12 pt-8 md:px-8 md:pb-16 lg:px-12"
      >
        <NuxtLink
          to="/"
          class="font-serif text-[0.65rem] uppercase tracking-[0.45em] text-white/95 sm:text-xs md:tracking-[0.55em]"
        >
          Culture Stone
        </NuxtLink>

        <div class="max-w-xl rounded bg-black/40 p-6 backdrop-blur-sm md:max-w-2xl md:p-8">
          <h1
            class="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Stone, considered.
          </h1>
          <p class="mt-8 max-w-lg font-sans text-lg font-light leading-relaxed text-white/95 sm:text-xl md:text-2xl">
            Bespoke slabs and architectural surfaces for discerning studios.
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
            The editor&rsquo;s letter
          </p>

          <blockquote
            class="mb-16 font-serif text-4xl font-normal leading-tight tracking-tight text-editorial-charcoal sm:mb-20 md:mb-24 lg:text-[60px] lg:leading-[60px]"
          >
            &ldquo;We believe material truth begins in the quarry&mdash;and ends in the quiet confidence of a room
            perfectly resolved.&rdquo;
          </blockquote>

          <div class="max-w-3xl space-y-10 font-sans text-base font-light leading-[1.85] text-editorial-charcoal/80 sm:text-lg sm:leading-[1.9] md:text-xl md:leading-[1.88]">
            <p>
              For over a generation, we have partnered with architects and interior designers who treat stone not as
              decoration, but as structure, atmosphere, and permanence. Our mandate is singular: to source and finish
              the world&rsquo;s most exceptional marbles, limestones, and granites&mdash;with provenance you can specify
              and character that cannot be replicated.
            </p>
            <p>
              Each relationship begins with listening. We travel to quarries, document veining and tone under natural
              light, and curate lots that honor your intent. What arrives on site is not inventory; it is a considered
              extension of your vision.
            </p>
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
            Authenticity &amp; sourcing
          </p>

          <div
            class="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16"
          >
            <div class="lg:col-span-7 lg:col-start-1">
              <figure class="overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1500&auto=format&fit=crop"
                  alt="Raw stone quarry, dramatic vertical strata"
                  class="h-[80vh] w-full object-cover"
                  width="1500"
                  height="2250"
                  loading="lazy"
                >
              </figure>
            </div>

            <div
              class="flex flex-col justify-start lg:col-span-5 lg:col-start-8 lg:mt-24 xl:mt-32"
            >
              <figure class="overflow-hidden lg:ml-4 xl:ml-10">
                <img
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1000&auto=format&fit=crop"
                  alt="Polished interior stone detail"
                  class="h-[40vh] w-full object-cover"
                  width="1000"
                  height="667"
                  loading="lazy"
                >
              </figure>

              <div
                class="mt-16 max-w-2xl font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:mt-20 sm:text-base lg:mt-24 lg:ml-2 xl:ml-6"
              >
                <p class="mb-6 font-serif text-2xl font-normal leading-snug text-editorial-charcoal md:text-3xl">
                  From bedrock to brief
                </p>
                <p>
                  We work directly with quarry partners across Europe and beyond, tracing each block from extraction
                  through fabrication. Documentation, lot photography, and physical samples ensure what you specify is
                  what your project receives&mdash;without compromise.
                </p>
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
              Signature collection
            </p>
            <h2 class="mt-6 font-serif text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl">
              The lookbook
            </h2>
          </div>

          <ul class="space-y-32 md:space-y-40 lg:space-y-48 xl:space-y-56">
            <li class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-16 xl:gap-x-20">
              <div class="lg:col-span-7 lg:col-start-1">
                <figure class="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1550053808-52a75a05955d?q=80&w=1200&auto=format&fit=crop"
                    alt="Dark marble surface with fine veining"
                    class="aspect-[5/4] w-full object-cover lg:min-h-[min(52vh,560px)]"
                    width="1200"
                    height="960"
                    loading="lazy"
                  >
                </figure>
              </div>
              <div class="max-w-2xl lg:col-span-4 lg:col-start-9 lg:pl-4">
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/45">
                  I &mdash; Nero Marquina
                </p>
                <h3 class="mt-5 font-serif text-3xl font-normal md:text-4xl">
                  Depth in monochrome
                </h3>
                <p class="mt-8 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:text-base">
                  A deep field with restrained white lightning. Suited to hearths, feature planes, and furniture
                  elements where shadow and polish do the speaking.
                </p>
              </div>
            </li>

            <li class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-16 xl:gap-x-20">
              <div class="order-2 max-w-2xl lg:order-1 lg:col-span-4 lg:col-start-1 lg:pr-4">
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/45">
                  II &mdash; Calacatta Oro
                </p>
                <h3 class="mt-5 font-serif text-3xl font-normal md:text-4xl">
                  Luminous veining
                </h3>
                <p class="mt-8 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:text-base">
                  Warm white ground with graphite and honey movement. Ideal for kitchens, gallery baths, and reception
                  volumes where daylight reveals the stone&rsquo;s character.
                </p>
              </div>
              <div class="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
                <figure class="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1719107647328-dd2134da4fa7?q=80&w=1200&auto=format&fit=crop"
                    alt="White marble with gold and grey veining"
                    class="aspect-[5/4] w-full object-cover lg:min-h-[min(52vh,560px)]"
                    width="1200"
                    height="960"
                    loading="lazy"
                  >
                </figure>
              </div>
            </li>

            <li class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-x-16 xl:gap-x-20">
              <div class="lg:col-span-7 lg:col-start-1">
                <figure class="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1764021995962-53921e9f2317?q=80&w=1200&auto=format&fit=crop"
                    alt="Textured grey granite surface"
                    class="aspect-[5/4] w-full object-cover lg:min-h-[min(52vh,560px)]"
                    width="1200"
                    height="960"
                    loading="lazy"
                  >
                </figure>
              </div>
              <div class="max-w-2xl lg:col-span-4 lg:col-start-9 lg:pl-4">
                <p class="font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal/45">
                  III &mdash; Caledonia
                </p>
                <h3 class="mt-5 font-serif text-3xl font-normal md:text-4xl">
                  Quiet strength
                </h3>
                <p class="mt-8 font-sans text-sm font-light leading-[1.9] text-editorial-charcoal/75 sm:text-base">
                  Salt-and-pepper grain with enduring density. Specify for flooring, cladding, and high-traffic
                  interiors that demand calm materiality and long service.
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
useHead({
  title: 'Culture Stone',
  meta: [{ name: 'description', content: 'Bespoke slabs and architectural surfaces for discerning studios.' }],
})
</script>
