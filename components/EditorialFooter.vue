<template>
  <footer class="border-t border-editorial-charcoal/15 px-4 py-24 md:px-8 md:py-28 lg:px-12 lg:py-32">
    <div class="mx-auto max-w-[1400px]">
      <div class="mb-20 flex flex-col gap-10 sm:mb-24 md:mb-28 lg:mb-32">
        <div
          class="flex flex-col gap-8 px-4 py-16 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10 sm:px-8 sm:py-20 md:gap-12 md:px-12 md:py-24 lg:px-16 lg:py-28"
        >
          <a
            href="mailto:studio@culturestone.example"
            class="inline-flex min-h-[3rem] items-center justify-center border border-editorial-charcoal/40 bg-transparent px-12 py-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal transition-colors duration-300 hover:border-editorial-charcoal hover:bg-editorial-charcoal hover:text-editorial-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal sm:min-h-0"
          >
            Inquire for specifications
          </a>
          <NuxtLink
            :to="secondaryHref"
            class="inline-flex min-h-[3rem] items-center justify-center border border-editorial-charcoal/40 bg-transparent px-12 py-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal transition-colors duration-300 hover:border-editorial-charcoal hover:bg-editorial-charcoal hover:text-editorial-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal sm:min-h-0"
          >
            {{ secondaryLabel }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex min-h-[3rem] items-center justify-center border border-editorial-charcoal/40 bg-transparent px-12 py-4 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal transition-colors duration-300 hover:border-editorial-charcoal hover:bg-editorial-charcoal hover:text-editorial-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-charcoal sm:min-h-0"
          >
            Contact
          </NuxtLink>
        </div>
      </div>

      <div
        class="border-t border-editorial-charcoal/10 pt-12 font-sans text-xs font-light leading-relaxed text-editorial-charcoal/55 sm:pt-16 sm:text-sm md:flex md:items-end md:justify-between md:gap-12"
      >
        <p>&copy; {{ year }} Culture Stone. All rights reserved.</p>
        <p class="mt-6 md:mt-0 md:text-right">
          <a href="#" class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal">New York</a>
          &middot;
          <a href="#" class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal">London</a>
          &middot;
          <a href="#" class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal">Milan</a>
          <span class="mx-2 text-editorial-charcoal/25">|</span>
          <a
            href="mailto:studio@culturestone.example"
            class="border-b border-editorial-charcoal/20 transition-colors hover:border-editorial-charcoal/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
          >studio@culturestone.example</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    secondaryHref?: string
    secondaryLabel?: string
  }>(),
  {
    secondaryHref: '/catalog',
    secondaryLabel: 'Browse Catalog',
  },
)

const year = new Date().getFullYear()
</script>
