<template>
  <main>
    <section class="px-4 py-24 md:px-8 md:py-32 lg:px-12 lg:py-36" aria-labelledby="legal-heading">
      <div class="mx-auto max-w-3xl">
        <p class="font-sans text-[0.7rem] uppercase tracking-[0.3em] text-editorial-charcoal/50">Legal</p>
        <h1 id="legal-heading" class="mt-6 font-serif text-4xl tracking-tight sm:text-5xl md:text-6xl">
          Legal notice
        </h1>
        <p class="mt-8 max-w-2xl text-base leading-relaxed text-editorial-charcoal/75 md:text-lg">
          Information about the operator of this website.
        </p>

        <div class="mt-16 space-y-12 text-base leading-relaxed text-editorial-charcoal/80">
          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Website operator
            </h2>
            <p class="mt-4">
              [Company Legal Name, in English and 中文]<br />
              [Street Address]<br />
              [District], [City] [Postal Code]<br />
              People&rsquo;s Republic of China
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Legal representative
            </h2>
            <p class="mt-4">
              [Full Name of Legal Representative / 法定代表人]
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Business registration
            </h2>
            <p class="mt-4">
              Unified Social Credit Code (统一社会信用代码): [18-character code]<br />
              Registration authority: [Administration for Market Regulation of …]
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Contact
            </h2>
            <p class="mt-4">
              Phone: [+86 000 0000 0000]<br />
              Email:
              <a
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
                href="mailto:studio@culturestone.example"
              >studio@culturestone.example</a>
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              Hosting
            </h2>
            <p class="mt-4">
              The public website is hosted in the European Union by [Hosting Provider Name], [Provider Address].
            </p>
            <p class="mt-4">
              The content management system (Strapi) that supplies product data and imagery is operated by us on a
              virtual private server in the Hong Kong Special Administrative Region of the People&rsquo;s Republic of
              China, hosted by [VPS Provider Name]. Further information on the resulting data flows is available in our
              <NuxtLink
                to="/privacy"
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
              [EU Representative Name / Company]<br />
              [Street Address]<br />
              [Postal Code] [City], [EU Member State]<br />
              Email: [rep@example.eu]
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
                to="/privacy"
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
              >Privacy Policy</NuxtLink>.
            </p>
          </section>
        </div>

        <p class="mt-20 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/40">
          Placeholder notice: replace all bracketed values with verified information before publishing.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Legal Notice — Culture Stone',
  meta: [
    { name: 'description', content: 'Legal notice and operator information for the Culture Stone website.' },
    { name: 'robots', content: 'index, follow' },
  ],
})
</script>
