<template>
  <main>
    <section class="px-6 py-32 md:px-12 md:py-48 lg:px-20 lg:py-56" aria-labelledby="legal-heading">
      <div class="mx-auto max-w-4xl">
        <div
          v-motion
          :initial="{ y: 20, opacity: 0 }"
          :enter="{ y: 0, opacity: 1, transition: { duration: 800 } }"
        >
          <p class="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/40">{{ t('legal.nav_label') }}</p>
          <h1 id="legal-heading" class="mt-8 font-serif text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {{ t('legal.page_title') }}
          </h1>
          <p class="mt-10 max-w-2xl font-sans text-lg font-light leading-relaxed text-editorial-charcoal/60 md:text-xl">
            {{ t('legal.subtitle') }}
          </p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 400, duration: 1000 } }"
          class="mt-24 space-y-20 text-base leading-relaxed text-editorial-charcoal/70"
        >
          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Website operator
            </h2>
            <p class="mt-4">
              Sichuan Zishu Chengfeng Building Materials Co., Ltd.<br />
              No. 54-1, South Third Section of Second Ring Road, High-tech Zone<br />
              Chengdu, Sichuan 610066<br />
              People&rsquo;s Republic of China
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Legal representative
            </h2>
            <p class="mt-4">
              Luo Shasha (骆沙沙)
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Business registration
            </h2>
            <p class="mt-4">
              Unified Social Credit Code (统一社会信用代码): 91510100MA6CN9DD81<br />
              Registration authority: Administration for Market Regulation of Chengdu High-tech Zone
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Contact
            </h2>
            <p class="mt-4">
              Phone: +86 151 9626 6588<br />
              Email:
              <a
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
                href="mailto:inquiries@culturestone.eu"
              >inquiries@culturestone.eu</a>
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Hosting
            </h2>
            <p class="mt-4">
              The public website is hosted by Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco,
              CA 94104, USA.
            </p>
            <p class="mt-4">
              The content management system (Strapi) that supplies product data and imagery is operated by us on a
              virtual private server. Product images are delivered via Cloudinary, Inc., 101 Spear Street,
              Floor 5, San Francisco, CA 94105, USA. Further information on the resulting data flows is available in our
              <NuxtLink
                :to="localePath('/privacy')"
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
              >Privacy Policy</NuxtLink>.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              EU representative (Art. 27 GDPR)
            </h2>
            <p class="mt-4">
              For matters concerning the processing of personal data of individuals in the European Union, our appointed
              representative under Article 27 of Regulation (EU) 2016/679 is:
            </p>
            <p class="mt-4">
              Synertrade FR SAS<br />
              9 rue du Bat d&rsquo;Argent<br />
              69001 Lyon, France<br />
              Email:
              <a
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
                href="mailto:info@syner-sarl.cn"
              >info@syner-sarl.cn</a>
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Content and liability
            </h2>
            <p class="mt-4">
              The content of this website is provided for general informational purposes. While we take care to keep
              information accurate and up to date, we make no warranty as to completeness or current validity. Links to
              third-party websites are provided for convenience; we have no influence over and assume no responsibility
              for their content.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Copyright
            </h2>
            <p class="mt-4">
              All text, imagery, and design elements on this site are the property of the website operator or used with
              permission. Reproduction, adaptation, distribution, or any other form of exploitation beyond the scope of
              applicable copyright law requires the prior written consent of the rights holder.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Data protection
            </h2>
            <p class="mt-4">
              For information on how personal data is processed on this website, please refer to our
              <NuxtLink
                :to="localePath('/privacy')"
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
              >Privacy Policy</NuxtLink>.
            </p>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

useHead({
  title: t('seo.legal.title'),
  meta: [{ name: 'robots', content: 'index, follow' }],
})

useSeoMeta({
  description: t('seo.legal.description'),
  ogTitle: t('seo.legal.title'),
  ogDescription: t('seo.legal.description'),
})
</script>
