<template>
  <main>
    <section class="px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36" aria-labelledby="contact-heading">
      <div class="mx-auto max-w-3xl">
        <p class="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-editorial-charcoal/50">{{ t('contact.page_label') }}</p>
        <h1 id="contact-heading" class="mt-6 font-serif text-4xl tracking-tight sm:text-5xl md:text-6xl">
          {{ t('contact.heading') }}
        </h1>
        <p class="mt-8 max-w-2xl text-base leading-relaxed text-editorial-charcoal/75 md:text-lg">
          {{ t('contact.body') }}
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
const { t } = useI18n()

useHead({
  title: t('seo.contact.title'),
  meta: [{ name: 'description', content: t('seo.contact.description') }],
})
</script>
