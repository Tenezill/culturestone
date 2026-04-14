<template>
  <div
    class="min-h-screen bg-editorial-cream text-editorial-charcoal font-sans antialiased selection:bg-editorial-charcoal/10"
  >
    <NuxtRouteAnnouncer />
    <header class="sticky top-0 z-50 border-b border-editorial-charcoal/10 bg-editorial-cream/95 backdrop-blur">
      <nav class="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-8" aria-label="Primary">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded border border-editorial-charcoal/20 px-3 py-2 text-xs uppercase tracking-[0.2em] text-editorial-charcoal transition-colors hover:border-editorial-charcoal/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
            :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
            aria-controls="mobile-navigation"
            aria-label="Toggle utility menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <span aria-hidden="true" class="space-y-1">
              <span class="block h-px w-4 bg-current" />
              <span class="block h-px w-4 bg-current" />
              <span class="block h-px w-4 bg-current" />
            </span>
            {{ isMobileMenuOpen ? 'Close' : 'Menu' }}
          </button>

          <NuxtLink
            to="/"
            class="font-serif text-[0.68rem] uppercase tracking-[0.4em] text-editorial-charcoal transition-colors hover:text-editorial-charcoal/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
          >
            Culture Stone
          </NuxtLink>
        </div>

        <ul class="hidden items-center gap-8 text-xs uppercase tracking-[0.25em] md:flex">
          <li><NuxtLink to="/" class="transition-colors hover:text-editorial-charcoal/70">Home</NuxtLink></li>
          <li><NuxtLink to="/catalog" class="transition-colors hover:text-editorial-charcoal/70">Catalog</NuxtLink></li>
          <li><NuxtLink to="/contact" class="transition-colors hover:text-editorial-charcoal/70">Contact</NuxtLink></li>
        </ul>
      </nav>

      <div
        id="mobile-navigation"
        class="border-t border-editorial-charcoal/10 px-4 py-5 md:px-8"
        :class="isMobileMenuOpen ? 'block' : 'hidden'"
      >
        <ul class="mx-auto max-w-[1600px] space-y-4 text-xs uppercase tracking-[0.25em]">
          <li><NuxtLink to="/" class="block" @click="isMobileMenuOpen = false">Home</NuxtLink></li>
          <li><NuxtLink to="/catalog" class="block" @click="isMobileMenuOpen = false">Catalog</NuxtLink></li>
          <li><NuxtLink to="/contact" class="block" @click="isMobileMenuOpen = false">Contact</NuxtLink></li>
          <li>
            <a href="mailto:studio@culturestone.example" class="block" @click="isMobileMenuOpen = false">
              Inquire for specifications
            </a>
          </li>
          <li class="pt-2 text-[0.65rem] tracking-[0.2em] text-editorial-charcoal/65">
            <a href="#" class="underline decoration-editorial-charcoal/30 underline-offset-4 hover:decoration-editorial-charcoal">New York</a>
            &middot;
            <a href="#" class="underline decoration-editorial-charcoal/30 underline-offset-4 hover:decoration-editorial-charcoal">London</a>
            &middot;
            <a href="#" class="underline decoration-editorial-charcoal/30 underline-offset-4 hover:decoration-editorial-charcoal">Milan</a>
          </li>
          <li>
            <a
              href="mailto:studio@culturestone.example"
              class="inline-block border-b border-editorial-charcoal/25 text-[0.65rem] tracking-[0.2em] text-editorial-charcoal/80 hover:border-editorial-charcoal/55"
              @click="isMobileMenuOpen = false"
            >studio@culturestone.example</a>
          </li>
        </ul>
      </div>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isMobileMenuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false
  },
)
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
