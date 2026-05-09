<template>
  <div ref="el" class="relative">
    <button
      type="button"
      class="inline-flex items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.3em] text-editorial-charcoal transition-colors hover:text-editorial-charcoal/60"
      :aria-expanded="isOpen"
      :aria-label="t('nav.language_switcher_label')"
      aria-haspopup="listbox"
      @click="isOpen = !isOpen"
      @keydown.escape="isOpen = false"
    >
      <PhGlobe :size="16" weight="light" />
      {{ locale }}
    </button>

    <div
      v-if="isOpen"
      v-motion
      :initial="{ opacity: 0, y: -10 }"
      :enter="{ opacity: 1, y: 0 }"
      role="listbox"
      class="absolute right-0 top-[calc(100%+1.5rem)] z-50 min-w-[10rem] border border-editorial-charcoal/5 bg-editorial-cream/95 p-2 backdrop-blur-xl shadow-2xl"
    >
      <ul class="space-y-1">
        <li
          v-for="loc in locales"
          :key="loc.code"
          role="option"
          :aria-selected="loc.code === locale"
        >
          <NuxtLink
            :to="switchLocalePath(loc.code)"
            class="block w-full px-4 py-3 font-sans text-[0.6rem] uppercase tracking-[0.25em] transition-all duration-300"
            :class="loc.code === locale
              ? 'bg-editorial-charcoal text-editorial-cream'
              : 'text-editorial-charcoal/40 hover:text-editorial-charcoal hover:bg-editorial-charcoal/5'"
            @click="isOpen = false"
          >
            {{ loc.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhGlobe } from '@phosphor-icons/vue'

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const isOpen = ref(false)
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  document.addEventListener('click', (e) => {
    if (el.value && !el.value.contains(e.target as Node)) {
      isOpen.value = false
    }
  })
})
</script>
