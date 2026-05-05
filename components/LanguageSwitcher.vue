<template>
  <div ref="el" class="relative">
    <button
      type="button"
      class="inline-flex items-center gap-[0.4em] rounded border border-editorial-charcoal/20 px-3 py-2 font-sans text-xs uppercase tracking-[0.2em] text-editorial-charcoal transition-colors hover:border-editorial-charcoal/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-editorial-charcoal"
      :aria-expanded="isOpen"
      :aria-label="t('nav.language_switcher_label')"
      aria-haspopup="listbox"
      @click="isOpen = !isOpen"
      @keydown.escape="isOpen = false"
    >
      {{ locale.toUpperCase() }}
      <span
        class="block h-[0.35em] w-[0.35em] border-b border-r border-current transition-transform duration-200"
        :class="isOpen ? '-rotate-135' : 'rotate-45'"
        aria-hidden="true"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-if="isOpen"
        role="listbox"
        class="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[7rem] border border-editorial-charcoal/15 bg-editorial-cream py-1 shadow-[0_4px_24px_rgba(26,26,26,0.08)]"
      >
        <li
          v-for="loc in locales"
          :key="loc.code"
          role="option"
          :aria-selected="loc.code === locale"
        >
          <NuxtLink
            :to="switchLocalePath(loc.code)"
            class="block w-full px-4 py-2.5 font-sans text-[0.65rem] uppercase tracking-[0.25em] transition-colors duration-150"
            :class="loc.code === locale
              ? 'text-editorial-charcoal'
              : 'text-editorial-charcoal/45 hover:text-editorial-charcoal'"
            @click="isOpen = false"
          >
            {{ loc.name }}
          </NuxtLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
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
