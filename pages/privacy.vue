<template>
  <main>
    <section class="px-6 py-32 md:px-12 md:py-48 lg:px-20 lg:py-56" aria-labelledby="privacy-heading">
      <div class="mx-auto max-w-4xl">
        <div
          v-motion
          :initial="{ y: 20, opacity: 0 }"
          :enter="{ y: 0, opacity: 1, transition: { duration: 800 } }"
        >
          <p class="font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-charcoal/40">{{ t('privacy.nav_label') }}</p>
          <h1 id="privacy-heading" class="mt-8 font-serif text-5xl tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {{ t('privacy.page_title') }}
          </h1>
          <p class="mt-10 max-w-2xl font-sans text-lg font-light leading-relaxed text-editorial-charcoal/60 md:text-xl">
            {{ t('privacy.subtitle') }}
          </p>
          <p class="mt-8 font-sans text-[0.55rem] uppercase tracking-[0.4em] text-editorial-charcoal/30">
            Last updated: June 20, 2026
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
              1. Controller
            </h2>
            <p class="mt-4">
              The controller responsible for the processing of your personal data within the meaning of Art. 4 (7) GDPR
              is:
            </p>
            <p class="mt-4">
              Sichuan Zishu Chengfeng Building Materials Co., Ltd.<br />
              No. 54-1, South Third Section of Second Ring Road, High-tech Zone<br />
              Chengdu, Sichuan 610066<br />
              People&rsquo;s Republic of China<br />
              Email:
              <a
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
                href="mailto:inquiries@culturestone.eu"
              >inquiries@culturestone.eu</a>
            </p>
            <p class="mt-4">
              Further information about the operator is available in our
              <NuxtLink
                :to="localePath('/legal')"
                class="underline decoration-editorial-charcoal/30 underline-offset-4 transition hover:decoration-editorial-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
              >Legal Notice</NuxtLink>.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              2. Representative in the European Union (Art. 27 GDPR)
            </h2>
            <p class="mt-4">
              As we are established outside the European Union but offer services to individuals in the EU, we have
              appointed the following representative pursuant to Article 27 GDPR:
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
            <p class="mt-4">
              You may contact our EU representative directly on any matter relating to the processing of your personal
              data or the exercise of your rights under the GDPR.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              3. Data protection officer
            </h2>
            <p class="mt-4">
              We are not legally required to appoint a Data Protection Officer. For any privacy-related questions,
              please contact us using the details in Section 1 or our EU representative in Section 2.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              4. Server log files
            </h2>
            <p class="mt-4">
              When you visit this website, our hosting provider automatically collects and stores information that your
              browser transmits to us in server log files. This includes:
            </p>
            <ul class="mt-4 list-disc space-y-1 pl-6">
              <li>IP address (shortened / pseudonymized where technically feasible)</li>
              <li>Date and time of the request</li>
              <li>Requested URL and HTTP status code</li>
              <li>Amount of data transferred</li>
              <li>Referrer URL</li>
              <li>Browser, operating system, and language</li>
            </ul>
            <p class="mt-4">
              <strong>Legal basis:</strong> Art. 6 (1) (f) GDPR — our legitimate interest in a secure, stable, and
              functioning website.<br />
              <strong>Retention:</strong> log data is deleted after 30 days, unless retention is required to
              investigate a concrete security incident.<br />
              <strong>Recipients:</strong> our hosting provider (see Section 5) processes this data on our behalf under
              a Data Processing Agreement pursuant to Art. 28 GDPR.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              5. Hosting
            </h2>
            <p class="mt-4">
              This website is hosted by Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104,
              United States of America. The hosting provider processes server log data and any data submitted through
              the site on our behalf under a Data Processing Agreement in accordance with Art. 28 GDPR. As Netlify is
              located in the United States, data transfers to Netlify are subject to Standard Contractual Clauses
              (see Section 10).
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              6. Cookies and similar technologies
            </h2>
            <p class="mt-4">
              This website currently sets only strictly necessary cookies required for the basic functioning of the
              site. No tracking, analytics, or advertising cookies are used. Strictly necessary cookies do not require
              consent under § 25 (2) TTDSG / Art. 5 (3) ePrivacy Directive.
            </p>
            <p class="mt-4">
              Should we introduce non-essential cookies in the future, we will obtain your prior explicit consent via a
              consent banner in accordance with Art. 6 (1) (a) GDPR and § 25 (1) TTDSG. You will be able to withdraw
              your consent at any time with effect for the future.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              7. Contact (inquiry form, email, and telephone)
            </h2>
            <p class="mt-4">
              If you contact us &mdash; whether via the inquiry form on our contact page or via the email or telephone
              links provided on this site &mdash; the personal data you transmit (e.g. your name, contact details, and
              the content of your message) will be stored and processed solely for the purpose of handling your inquiry.
            </p>
            <p class="mt-4">
              Submissions made through the inquiry form are received and processed on our behalf by Netlify, Inc.
              (see Section 5) under a Data Processing Agreement pursuant to Art. 28 GDPR. As Netlify is established in
              the United States, this involves a transfer of the data you submit to the United States (see
              Section 10 (a)).
            </p>
            <p class="mt-4">
              <strong>Legal basis:</strong> Art. 6 (1) (b) GDPR where your inquiry relates to the performance of a
              contract or pre-contractual measures; otherwise Art. 6 (1) (f) GDPR (our legitimate interest in responding
              to inquiries).<br />
              <strong>Retention:</strong> we retain this data for as long as necessary to process your inquiry and
              thereafter in accordance with applicable statutory retention obligations.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              8. Web fonts
            </h2>
            <p class="mt-4">
              All web fonts used on this site are self-hosted and served from the same origin as the website
              (see Section 5 on hosting). No connection to Google Fonts or any similar third-party font service is
              established when you load a page, and no font-related data is transmitted to third parties.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              9. Product imagery and content management system
            </h2>
            <p class="mt-4">
              Product images and editorial assets shown on this website are stored in and delivered via Cloudinary,
              Inc., 101 Spear Street, Floor 5, San Francisco, CA 94105, USA. Our content management system (Strapi),
              which manages the catalogue data, is operated by us on a separate virtual private server.
            </p>
            <p class="mt-4">
              When your browser loads a product image, your IP address and standard HTTP request metadata (browser
              type, referrer, timestamp) are transmitted to Cloudinary&rsquo;s servers in the United States. The Strapi
              content management system, which holds the underlying catalogue data, is operated by us on our own
              virtual private server and is not accessed directly by your browser when you view the site.
            </p>
            <p class="mt-4">
              <strong>Legal basis:</strong> Art. 6 (1) (f) GDPR — our legitimate interest in delivering product imagery
              efficiently and in enabling our commercial team to update the catalogue.<br />
              <strong>Retention:</strong> standard web-server access logs on the CMS server are deleted after
              30 days.<br />
              <strong>International transfer:</strong> see Section 10 below.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              10. International transfers
            </h2>
            <p class="mt-4">
              Two categories of transfer to countries outside the European Economic Area may occur in connection with
              this website:
            </p>
            <p class="mt-4">
              <strong>(a) Transfers to the United States.</strong> Our website is hosted by Netlify, Inc. and product
              imagery is delivered via Cloudinary, Inc., both established in the United States. Where your browser loads
              pages or images from our site, your IP address and request metadata are transferred to servers operated by
              these providers. The European Commission has issued an adequacy decision for the EU–US Data Privacy
              Framework; where applicable, this framework provides the legal basis for such transfers. Where not covered
              by the adequacy decision, transfers rely on Standard Contractual Clauses.
            </p>
            <p class="mt-4">
              <strong>(b) Transfers to the People&rsquo;s Republic of China.</strong> Where you contact us and your
              inquiry is handled by our team at the address shown in Section 1, the content of your inquiry may be
              accessed and processed in mainland China. The European Commission has not issued an adequacy decision for
              the People&rsquo;s Republic of China.
            </p>
            <p class="mt-4">
              Such transfers are safeguarded by:
            </p>
            <ul class="mt-4 list-disc space-y-1 pl-6">
              <li>EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914 of 4 June 2021) between the EU data exporter and the data importer, supplemented where required by a transfer impact assessment and additional technical and organizational measures.</li>
              <li>For one-off replies to pre-contractual inquiries you have initiated: Art. 49 (1) (b) GDPR (transfer necessary for the performance of a contract or pre-contractual measures taken at your request). This basis is used only for occasional, non-systematic transfers.</li>
            </ul>
            <p class="mt-4">
              A copy of the relevant safeguards may be requested from us at the address in Section 1 or from our EU
              representative in Section 2.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              11. Your rights under the GDPR
            </h2>
            <p class="mt-4">
              Under the GDPR, you have the following rights in respect of your personal data:
            </p>
            <ul class="mt-4 list-disc space-y-1 pl-6">
              <li>Right of access (Art. 15 GDPR)</li>
              <li>Right to rectification (Art. 16 GDPR)</li>
              <li>Right to erasure / &ldquo;right to be forgotten&rdquo; (Art. 17 GDPR)</li>
              <li>Right to restriction of processing (Art. 18 GDPR)</li>
              <li>Right to data portability (Art. 20 GDPR)</li>
              <li>Right to object to processing based on legitimate interests (Art. 21 GDPR)</li>
              <li>Right to withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal (Art. 7 (3) GDPR)</li>
            </ul>
            <p class="mt-4">
              To exercise any of these rights, please contact us using the details in Section 1 or our EU representative
              in Section 2. We will respond without undue delay and in any event within one month of receipt of the
              request, in accordance with Art. 12 (3) GDPR.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              12. Right to lodge a complaint
            </h2>
            <p class="mt-4">
              Without prejudice to any other administrative or judicial remedy, you have the right to lodge a complaint
              with a supervisory authority, in particular in the Member State of your habitual residence, place of work,
              or place of the alleged infringement, if you consider that the processing of your personal data
              infringes the GDPR (Art. 77 GDPR).
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              13. Your rights under the PIPL
            </h2>
            <p class="mt-4">
              If you are located in the People&rsquo;s Republic of China, the Personal Information Protection Law
              (PIPL) applies to the processing of your personal information. In particular, you have the right to
              access, correct, copy, and port your personal information, to request deletion, to withdraw consent, and
              to request an explanation of our processing rules. To exercise these rights, please contact us using the
              details in Section 1.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              14. Automated decision-making
            </h2>
            <p class="mt-4">
              We do not use automated decision-making, including profiling, within the meaning of Art. 22 GDPR on this
              website.
            </p>
          </section>

          <section>
            <h2 class="font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal/55">
              15. Changes to this privacy policy
            </h2>
            <p class="mt-4">
              We may update this privacy policy from time to time to reflect changes to our processing activities or to
              the legal framework. The current version is always available on this page and is identified by the date of
              its last update at the top of the document.
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
  title: t('seo.privacy.title'),
  meta: [{ name: 'robots', content: 'index, follow' }],
})

useSeoMeta({
  description: t('seo.privacy.description'),
  ogTitle: t('seo.privacy.title'),
  ogDescription: t('seo.privacy.description'),
})
</script>
