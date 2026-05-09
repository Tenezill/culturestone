<template>
  <footer class="border-t border-editorial-charcoal/10 px-6 py-32 md:px-12 md:py-40 lg:px-20">
    <div class="mx-auto max-w-[1600px]">
      <div class="mb-32">
        <div
          class="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="max-w-2xl">
            <h2 class="font-serif text-4xl font-normal leading-tight text-editorial-charcoal md:text-5xl lg:text-6xl">
              {{ t('footer.inquire') }}
            </h2>
            <p class="mt-8 font-sans text-lg font-light text-editorial-charcoal/60">
              Transforming spaces with timeless stone. Reach out for a consultation or browse our latest collections.
            </p>
          </div>

          <div class="flex flex-wrap gap-6">
            <a
              href="mailto:inquiries@culturestone.eu"
              class="group inline-flex items-center gap-3 border border-editorial-charcoal px-10 py-5 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-editorial-charcoal transition-all duration-500 hover:bg-editorial-charcoal hover:text-editorial-cream"
            >
              <PhEnvelopeSimple :size="18" weight="light" class="transition-transform group-hover:scale-110" />
              Email Us
            </a>
            <NuxtLink
              :to="resolvedSecondaryHref"
              class="inline-flex items-center border border-editorial-charcoal px-10 py-5 font-sans text-[0.7rem] uppercase tracking-[0.25em] text-editorial-charcoal transition-all duration-500 hover:bg-editorial-charcoal hover:text-editorial-cream"
            >
              {{ displayLabel }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        class="border-t border-editorial-charcoal/5 pt-16 font-sans text-xs font-light tracking-wide text-editorial-charcoal/40 md:flex md:items-end md:justify-between"
      >
        <div class="space-y-4 md:space-y-0 md:flex md:items-center md:gap-8">
          <p>&copy; {{ year }} Culture Stone</p>
          <div class="flex gap-4">
            <NuxtLink :to="localePath('/legal')" class="transition-colors hover:text-editorial-charcoal">{{ t('footer.legal_notice') }}</NuxtLink>
            <NuxtLink :to="localePath('/privacy')" class="transition-colors hover:text-editorial-charcoal">{{ t('footer.privacy') }}</NuxtLink>
          </div>
        </div>
        
        <div class="mt-8 md:mt-0 flex flex-wrap gap-x-6 gap-y-2">
          <span class="flex items-center gap-2">
            <PhMapPin :size="14" />
            {{ t('footer.locations.new_york') }}
          </span>
          <span class="flex items-center gap-2">
            <PhMapPin :size="14" />
            {{ t('footer.locations.london') }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PhEnvelopeSimple, PhMapPin } from '@phosphor-icons/vue'

const { t } = useI18n()
const localePath = useLocalePath()

const props = withDefaults(
  defineProps<{
    secondaryHref?: string
    secondaryLabel?: string
  }>(),
  {
    secondaryHref: '/catalog',
  },
)

const displayLabel = computed(() => props.secondaryLabel ?? t('footer.browse_catalog'))
const resolvedSecondaryHref = computed(() => localePath(props.secondaryHref))

const year = new Date().getFullYear()
</script>
