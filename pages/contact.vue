<template>
  <main>
    <div class="bg-editorial-charcoal text-editorial-cream lg:grid lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-2">

      <!-- Left: Stone image panel — desktop only -->
      <div class="relative hidden lg:block overflow-hidden">
        <div
          v-motion
          :initial="{ scale: 1.1, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1, transition: { duration: 1500, ease: 'easeOut' } }"
          class="absolute inset-0"
        >
          <img
            src="/img/ai-rock-formation.jpg"
            alt="Stone formation"
            class="h-full w-full object-cover opacity-30"
            width="1376"
            height="768"
          >
        </div>
        <div class="absolute inset-0 bg-editorial-charcoal/40" aria-hidden="true" />
        <div class="relative flex h-full flex-col justify-between p-16 xl:p-20">
          <div />
          <div
            v-motion
            :initial="{ y: 40, opacity: 0 }"
            :enter="{ y: 0, opacity: 1, transition: { delay: 400, duration: 1000 } }"
            class="max-w-md"
          >
            <p class="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-editorial-cream/70">
              {{ t('contact.page_label') }}
            </p>
            <h1 class="mt-8 font-serif text-6xl font-normal leading-[1.04] tracking-tight text-editorial-cream xl:text-7xl">
              {{ t('contact.heading') }}
            </h1>
            <p class="mt-10 font-sans text-lg font-light leading-[1.8] text-editorial-cream/80">
              {{ t('contact.body') }}
            </p>
          </div>
          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 800, duration: 1000 } }"
            class="flex gap-16"
          >
            <div>
              <p class="font-sans text-[0.55rem] uppercase tracking-[0.5em] text-editorial-cream/50">
                {{ t('contact.info.email_label') }}
              </p>
              <a
                href="mailto:inquiries@culturestone.eu"
                class="mt-4 block font-sans text-xs tracking-[0.1em] text-editorial-cream/80 transition-colors hover:text-white"
              >
                inquiries@culturestone.eu
              </a>
            </div>
            <div>
              <p class="font-sans text-[0.55rem] uppercase tracking-[0.5em] text-editorial-cream/50">
                {{ t('contact.info.studios_label') }}
              </p>
              <p class="mt-4 font-sans text-xs tracking-[0.1em] text-editorial-cream/80">
                Chengdu &middot; Lyon
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form panel -->
      <div class="flex flex-col justify-center px-6 py-32 sm:px-12 md:px-20 lg:px-16 xl:px-24">

        <!-- Mobile-only heading -->
        <div class="mb-20 lg:hidden">
          <p class="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-editorial-cream/70">
            {{ t('contact.page_label') }}
          </p>
          <h1 class="mt-8 font-serif text-5xl font-normal leading-[1.06] tracking-tight text-editorial-cream sm:text-6xl">
            {{ t('contact.heading') }}
          </h1>
          <p class="mt-8 font-sans text-base font-light leading-[1.8] text-editorial-cream/80">
            {{ t('contact.body') }}
          </p>
        </div>

        <div v-if="submitted" class="flex flex-col">
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            <p class="font-sans text-[0.65rem] uppercase tracking-[0.5em] text-editorial-cream/40">
              {{ t('contact.success.label') }}
            </p>
            <h2 class="mt-8 font-serif text-4xl font-normal tracking-tight text-editorial-cream sm:text-5xl">
              {{ t('contact.success.heading') }}
            </h2>
            <p class="mt-8 max-w-sm font-sans text-base font-light leading-[1.8] text-editorial-cream/60">
              {{ t('contact.success.body') }}
            </p>
            <button
              type="button"
              class="mt-16 group inline-flex items-center gap-4 font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-cream/60 transition-colors hover:text-editorial-cream"
              @click="resetForm"
            >
              <PhArrowLeft :size="16" class="transition-transform group-hover:-translate-x-1" />
              {{ t('contact.success.reset') }}
            </button>
          </div>
        </div>

        <form
          v-else
          name="contact"
          data-netlify="true"
          netlify-honeypot="bot-field"
          novalidate
          class="space-y-16"
          @submit.prevent="handleSubmit"
        >
          <input type="hidden" name="form-name" value="contact">
          
          <div
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            class="grid grid-cols-1 gap-16 sm:grid-cols-2"
          >
            <div class="group">
              <label for="f-name" class="block font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-cream/70 transition-colors group-focus-within:text-editorial-cream">
                {{ t('contact.form.name') }} *
              </label>
              <input
                id="f-name"
                v-model="form.name"
                type="text"
                class="mt-6 block w-full border-b border-editorial-cream/30 bg-transparent pb-6 pt-1 font-sans text-base text-editorial-cream outline-none transition-colors focus:border-editorial-cream"
                @blur="validateField('name')"
              >
              <p v-if="errors.name" class="mt-4 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-red-300">{{ errors.name }}</p>
            </div>
            <div class="group">
              <label for="f-studio" class="block font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-cream/70 transition-colors group-focus-within:text-editorial-cream">
                {{ t('contact.form.studio') }}
              </label>
              <input
                id="f-studio"
                v-model="form.studio"
                type="text"
                class="mt-6 block w-full border-b border-editorial-cream/30 bg-transparent pb-6 pt-1 font-sans text-base text-editorial-cream outline-none transition-colors focus:border-editorial-cream"
              >
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
            class="group"
          >
            <label for="f-email" class="block font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-cream/70 transition-colors group-focus-within:text-editorial-cream">
              {{ t('contact.form.email') }} *
            </label>
            <input
              id="f-email"
              v-model="form.email"
              type="email"
              class="mt-6 block w-full border-b border-editorial-cream/30 bg-transparent pb-6 pt-1 font-sans text-base text-editorial-cream outline-none transition-colors focus:border-editorial-cream"
              @blur="validateField('email')"
            >
            <p v-if="errors.email" class="mt-4 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-red-300">{{ errors.email }}</p>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
            class="grid grid-cols-1 gap-16 sm:grid-cols-2"
          >
            <div class="group">
              <label for="f-type" class="block font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-cream/70 transition-colors group-focus-within:text-editorial-cream">
                {{ t('contact.form.project_type') }}
              </label>
              <select id="f-type" v-model="form.projectType" class="mt-6 block w-full appearance-none border-b border-editorial-cream/30 bg-transparent pb-6 pt-1 font-sans text-base text-editorial-cream outline-none transition-colors focus:border-editorial-cream">
                <option value="" disabled class="bg-editorial-charcoal">{{ t('contact.form.project_type_placeholder') }}</option>
                <option value="residential" class="bg-editorial-charcoal">Residential</option>
                <option value="commercial" class="bg-editorial-charcoal">Commercial</option>
                <option value="hospitality" class="bg-editorial-charcoal">Hospitality</option>
              </select>
            </div>
            <div class="group">
              <label for="f-timeline" class="block font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-cream/70 transition-colors group-focus-within:text-editorial-cream">
                {{ t('contact.form.timeline') }}
              </label>
              <input id="f-timeline" v-model="form.timeline" type="text" class="mt-6 block w-full border-b border-editorial-cream/30 bg-transparent pb-6 pt-1 font-sans text-base text-editorial-cream outline-none transition-colors focus:border-editorial-cream">
            </div>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 700 } }"
            class="group"
          >
            <label for="f-brief" class="block font-sans text-[0.65rem] uppercase tracking-[0.4em] text-editorial-cream/70 transition-colors group-focus-within:text-editorial-cream">
              {{ t('contact.form.brief') }}
            </label>
            <textarea id="f-brief" v-model="form.brief" rows="4" class="mt-6 block w-full resize-none border-b border-editorial-cream/30 bg-transparent pb-6 pt-1 font-sans text-base text-editorial-cream outline-none transition-colors focus:border-editorial-cream" />
          </div>

          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 800 } }"
            class="pt-8"
          >
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-editorial-cream py-7 font-sans text-[0.75rem] uppercase tracking-[0.3em] text-editorial-charcoal transition-all duration-500 hover:bg-transparent hover:text-editorial-cream border border-editorial-cream disabled:opacity-50"
            >
              {{ isSubmitting ? t('contact.form.submitting') : t('contact.form.submit') }}
            </button>
            <p class="mt-10 font-sans text-[0.7rem] leading-relaxed text-editorial-cream/50">
              {{ t('contact.form.privacy_note_before') }}
              <NuxtLink :to="localePath('/privacy')" class="underline underline-offset-4 hover:text-editorial-cream">{{ t('contact.form.privacy_link_text') }}</NuxtLink>
              {{ t('contact.form.privacy_note_after') }}
            </p>
          </div>
        </form>
      </div>
    </div>

    <EditorialFooter secondary-href="/catalog" :secondary-label="t('nav.catalog')" />
  </main>
</template>

<script setup lang="ts">
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { buildBreadcrumbSchema, useSiteUrl } from '~/composables/useSchema'

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const siteUrl = useSiteUrl()

const contactPageSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: t('seo.contact.title'),
  description: t('seo.contact.description'),
  url: `${siteUrl}/contact`,
  breadcrumb: buildBreadcrumbSchema(siteUrl, [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]),
  isPartOf: { '@type': 'WebSite', url: siteUrl },
}))

useHead({
  title: t('seo.contact.title'),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(contactPageSchema.value),
    },
  ],
})

useSeoMeta({
  description: t('seo.contact.description'),
  ogTitle: t('seo.contact.title'),
  ogDescription: t('seo.contact.description'),
  ogImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
  ogUrl: `${siteUrl}/contact`,
  ogType: 'website',
  twitterTitle: t('seo.contact.title'),
  twitterDescription: t('seo.contact.description'),
  twitterImage: `${siteUrl}/img/ai-hero-marble-interior.jpg`,
})

const form = reactive({
  name: '',
  studio: '',
  email: '',
  projectType: '',
  timeline: '',
  stone: (route.query.stone as string) ?? '',
  brief: '',
})

const errors = reactive({ name: '', email: '' })
const isSubmitting = ref(false)
const submitted = ref(false)

function validateField(field: 'name' | 'email') {
  if (field === 'name') {
    errors.name = form.name.trim() ? '' : t('contact.form.error_name')
  }
  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = t('contact.form.error_email_required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errors.email = t('contact.form.error_email_invalid')
    } else {
      errors.email = ''
    }
  }
}

function validateAll(): boolean {
  validateField('name')
  validateField('email')
  return !errors.name && !errors.email
}

async function handleSubmit() {
  if (!validateAll()) return
  isSubmitting.value = true
  try {
    const body = new URLSearchParams({
      'form-name': 'contact',
      name: form.name,
      studio: form.studio,
      email: form.email,
      projectType: form.projectType,
      timeline: form.timeline,
      stone: form.stone,
      brief: form.brief,
    })
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
    submitted.value = true
  }
  catch {
    submitted.value = true
  }
  finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  Object.assign(form, { name: '', studio: '', email: '', projectType: '', timeline: '', stone: '', brief: '' })
  errors.name = ''
  errors.email = ''
  submitted.value = false
}
</script>
