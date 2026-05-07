<template>
  <main>
    <div class="bg-editorial-charcoal text-editorial-cream lg:grid lg:min-h-[calc(100dvh-3.5rem)] lg:grid-cols-2">

      <!-- Left: Stone image panel — desktop only -->
      <div class="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1400&auto=format&fit=crop"
          alt="Stone quarry with dramatic vertical strata"
          class="absolute inset-0 h-full w-full object-cover opacity-55"
          width="1400"
          height="2100"
        >
        <div class="absolute inset-0 bg-gradient-to-br from-editorial-charcoal/50 via-transparent to-editorial-charcoal/70" aria-hidden="true" />
        <div class="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <div />
          <div class="max-w-sm">
            <p class="font-sans text-[0.55rem] uppercase tracking-[0.5em] text-editorial-cream/40">
              {{ t('contact.page_label') }}
            </p>
            <h1 class="mt-5 font-serif text-5xl font-normal leading-[1.04] tracking-tight xl:text-[56px]">
              {{ t('contact.heading') }}
            </h1>
            <p class="mt-8 font-sans text-sm font-light leading-[1.9] text-editorial-cream/58">
              {{ t('contact.body') }}
            </p>
          </div>
          <div class="space-y-6">
            <div>
              <p class="font-sans text-[0.5rem] uppercase tracking-[0.5em] text-editorial-cream/30">
                {{ t('contact.info.email_label') }}
              </p>
              <a
                href="mailto:inquiries@culturestone.eu"
                class="mt-2 block font-sans text-xs tracking-wide text-editorial-cream/60 underline decoration-editorial-cream/15 underline-offset-4 transition-all duration-300 hover:text-editorial-cream hover:decoration-editorial-cream/40"
              >
                inquiries@culturestone.eu
              </a>
            </div>
            <div>
              <p class="font-sans text-[0.5rem] uppercase tracking-[0.5em] text-editorial-cream/30">
                {{ t('contact.info.phone_label') }}
              </p>
              <a
                href="tel:+8615196266588"
                class="mt-2 block font-sans text-xs tracking-wide text-editorial-cream/60 underline decoration-editorial-cream/15 underline-offset-4 transition-all duration-300 hover:text-editorial-cream hover:decoration-editorial-cream/40"
              >
                +86 151 9626 6588
              </a>
            </div>
            <div>
              <p class="font-sans text-[0.5rem] uppercase tracking-[0.5em] text-editorial-cream/30">
                {{ t('contact.info.studios_label') }}
              </p>
              <p class="mt-2 font-sans text-xs tracking-wide text-editorial-cream/45">
                Chengdu &middot; Lyon
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form panel -->
      <div class="flex flex-col justify-center px-6 py-20 sm:px-10 md:px-14 lg:px-12 xl:px-16 2xl:px-20">

        <!-- Mobile-only heading -->
        <div class="mb-14 lg:hidden">
          <p class="font-sans text-[0.55rem] uppercase tracking-[0.5em] text-editorial-cream/40">
            {{ t('contact.page_label') }}
          </p>
          <h1 class="mt-5 font-serif text-4xl font-normal leading-[1.06] tracking-tight sm:text-5xl">
            {{ t('contact.heading') }}
          </h1>
          <p class="mt-6 font-sans text-sm font-light leading-[1.9] text-editorial-cream/58">
            {{ t('contact.body') }}
          </p>
        </div>

        <Transition name="form-fade" mode="out-in">

          <!-- Success state -->
          <div v-if="submitted" key="success" class="flex flex-col py-4">
            <div class="mb-10 h-px w-10 bg-editorial-cream/20" aria-hidden="true" />
            <p class="font-sans text-[0.6rem] uppercase tracking-[0.4em] text-editorial-cream/40">
              {{ t('contact.success.label') }}
            </p>
            <p class="mt-6 font-serif text-3xl font-normal tracking-tight sm:text-4xl">
              {{ t('contact.success.heading') }}
            </p>
            <p class="mt-6 max-w-sm font-sans text-sm font-light leading-[1.9] text-editorial-cream/55">
              {{ t('contact.success.body') }}
            </p>
            <button
              type="button"
              class="mt-14 w-max border-b border-editorial-cream/20 pb-px font-sans text-[0.6rem] uppercase tracking-[0.28em] text-editorial-cream/45 transition-colors duration-300 hover:border-editorial-cream hover:text-editorial-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-cream"
              @click="resetForm"
            >
              {{ t('contact.success.reset') }}
            </button>
          </div>

          <!-- Inquiry form -->
          <form
            v-else
            key="form"
            name="contact"
            data-netlify="true"
            netlify-honeypot="bot-field"
            novalidate
            class="space-y-10 xl:space-y-11"
            @submit.prevent="handleSubmit"
          >
            <input type="hidden" name="form-name" value="contact">
            <!-- Name + Studio -->
            <div class="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <label
                  for="f-name"
                  class="block font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-cream/40"
                >
                  {{ t('contact.form.name') }}
                  <span aria-hidden="true" class="text-editorial-cream/22">*</span>
                </label>
                <input
                  id="f-name"
                  v-model="form.name"
                  type="text"
                  autocomplete="name"
                  :aria-invalid="!!errors.name"
                  :aria-describedby="errors.name ? 'err-name' : undefined"
                  class="mt-3 block w-full border-b bg-transparent pb-3 pt-1 font-sans text-sm text-editorial-cream caret-editorial-cream outline-none transition-colors duration-200 focus:border-editorial-cream"
                  :class="errors.name ? 'border-red-400/45' : 'border-editorial-cream/15'"
                  @blur="validateField('name')"
                >
                <p
                  v-if="errors.name"
                  id="err-name"
                  class="mt-2 font-sans text-[0.55rem] uppercase tracking-[0.2em] text-red-400/65"
                  role="alert"
                >
                  {{ errors.name }}
                </p>
              </div>
              <div>
                <label
                  for="f-studio"
                  class="block font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-cream/40"
                >
                  {{ t('contact.form.studio') }}
                </label>
                <input
                  id="f-studio"
                  v-model="form.studio"
                  type="text"
                  autocomplete="organization"
                  class="mt-3 block w-full border-b border-editorial-cream/15 bg-transparent pb-3 pt-1 font-sans text-sm text-editorial-cream caret-editorial-cream outline-none transition-colors duration-200 focus:border-editorial-cream"
                >
              </div>
            </div>

            <!-- Email -->
            <div>
              <label
                for="f-email"
                class="block font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-cream/40"
              >
                {{ t('contact.form.email') }}
                <span aria-hidden="true" class="text-editorial-cream/22">*</span>
              </label>
              <input
                id="f-email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'err-email' : undefined"
                class="mt-3 block w-full border-b bg-transparent pb-3 pt-1 font-sans text-sm text-editorial-cream caret-editorial-cream outline-none transition-colors duration-200 focus:border-editorial-cream"
                :class="errors.email ? 'border-red-400/45' : 'border-editorial-cream/15'"
                @blur="validateField('email')"
              >
              <p
                v-if="errors.email"
                id="err-email"
                class="mt-2 font-sans text-[0.55rem] uppercase tracking-[0.2em] text-red-400/65"
                role="alert"
              >
                {{ errors.email }}
              </p>
            </div>

            <!-- Project Type + Timeline -->
            <div class="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <label
                  for="f-type"
                  class="block font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-cream/40"
                >
                  {{ t('contact.form.project_type') }}
                </label>
                <div class="relative">
                  <select
                    id="f-type"
                    v-model="form.projectType"
                    class="mt-3 block w-full appearance-none border-b border-editorial-cream/15 bg-transparent pb-3 pt-1 pr-6 font-sans text-sm text-editorial-cream outline-none transition-colors duration-200 focus:border-editorial-cream"
                  >
                    <option value="" disabled class="bg-editorial-charcoal text-editorial-cream/50">
                      {{ t('contact.form.project_type_placeholder') }}
                    </option>
                    <option value="residential" class="bg-editorial-charcoal text-editorial-cream">
                      {{ t('contact.form.project_types.residential') }}
                    </option>
                    <option value="commercial" class="bg-editorial-charcoal text-editorial-cream">
                      {{ t('contact.form.project_types.commercial') }}
                    </option>
                    <option value="hospitality" class="bg-editorial-charcoal text-editorial-cream">
                      {{ t('contact.form.project_types.hospitality') }}
                    </option>
                    <option value="public" class="bg-editorial-charcoal text-editorial-cream">
                      {{ t('contact.form.project_types.public') }}
                    </option>
                  </select>
                  <svg
                    class="pointer-events-none absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-editorial-cream/30"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <div>
                <label
                  for="f-timeline"
                  class="block font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-cream/40"
                >
                  {{ t('contact.form.timeline') }}
                </label>
                <input
                  id="f-timeline"
                  v-model="form.timeline"
                  type="text"
                  :placeholder="t('contact.form.timeline_placeholder')"
                  class="mt-3 block w-full border-b border-editorial-cream/15 bg-transparent pb-3 pt-1 font-sans text-sm text-editorial-cream caret-editorial-cream outline-none transition-colors duration-200 placeholder:text-editorial-cream/18 focus:border-editorial-cream"
                >
              </div>
            </div>

            <!-- Stone(s) of Interest -->
            <div>
              <label
                for="f-stone"
                class="block font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-cream/40"
              >
                {{ t('contact.form.stone') }}
              </label>
              <input
                id="f-stone"
                v-model="form.stone"
                type="text"
                :placeholder="t('contact.form.stone_placeholder')"
                class="mt-3 block w-full border-b border-editorial-cream/15 bg-transparent pb-3 pt-1 font-sans text-sm text-editorial-cream caret-editorial-cream outline-none transition-colors duration-200 placeholder:text-editorial-cream/18 focus:border-editorial-cream"
              >
            </div>

            <!-- Project Brief -->
            <div>
              <label
                for="f-brief"
                class="block font-sans text-[0.55rem] uppercase tracking-[0.45em] text-editorial-cream/40"
              >
                {{ t('contact.form.brief') }}
              </label>
              <textarea
                id="f-brief"
                v-model="form.brief"
                rows="4"
                :placeholder="t('contact.form.brief_placeholder')"
                class="mt-3 block w-full resize-none border-b border-editorial-cream/15 bg-transparent pb-3 pt-1 font-sans text-sm text-editorial-cream caret-editorial-cream outline-none transition-colors duration-200 placeholder:text-editorial-cream/18 focus:border-editorial-cream"
              />
            </div>

            <!-- Submit -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-editorial-cream py-5 font-sans text-[0.7rem] uppercase tracking-[0.28em] text-editorial-charcoal transition-colors duration-300 hover:bg-editorial-cream/88 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-editorial-cream disabled:cursor-not-allowed disabled:opacity-40"
              >
                {{ isSubmitting ? t('contact.form.submitting') : t('contact.form.submit') }}
              </button>
              <p class="mt-5 font-sans text-[0.55rem] leading-[1.85] text-editorial-cream/28">
                {{ t('contact.form.privacy_note_before') }}<NuxtLink
                  :to="localePath('/privacy')"
                  class="underline decoration-editorial-cream/18 transition-colors duration-300 hover:decoration-editorial-cream/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-editorial-cream"
                >{{ t('contact.form.privacy_link_text') }}</NuxtLink>{{ t('contact.form.privacy_note_after') }}
              </p>
            </div>
          </form>

        </Transition>
      </div>
    </div>

    <EditorialFooter secondary-href="/catalog" :secondary-label="t('nav.catalog')" />
  </main>
</template>

<script setup lang="ts">
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

<style scoped>
.form-fade-enter-active,
.form-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.form-fade-enter-from,
.form-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
