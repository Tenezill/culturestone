<template>
  <main>
    <section class="px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36" aria-labelledby="contact-heading">
      <div class="mx-auto max-w-3xl">
        <p class="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-editorial-charcoal/50">Contact</p>
        <h1 id="contact-heading" class="mt-6 font-serif text-4xl tracking-tight sm:text-5xl md:text-6xl">
          Let&apos;s specify something enduring
        </h1>
        <p class="mt-8 max-w-2xl text-base leading-relaxed text-editorial-charcoal/75 md:text-lg">
          Share project timelines, material intent, and quantities. We will return a curated slab recommendation,
          technical guidance, and sample strategy.
        </p>

        <div class="mt-12 space-y-5 text-sm uppercase tracking-[0.2em] text-editorial-charcoal/70">
          <a class="block underline decoration-editorial-charcoal/30 underline-offset-4 hover:decoration-editorial-charcoal" href="mailto:studio@culturestone.example">studio@culturestone.example</a>
          <a class="block underline decoration-editorial-charcoal/30 underline-offset-4 hover:decoration-editorial-charcoal" href="tel:+12125551234">+1 212 555 1234</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Contact — Culture Stone',
  meta: [{ name: 'description', content: 'Contact Culture Stone for project specifications and stone curation.' }],
})
</script>
