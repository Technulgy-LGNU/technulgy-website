<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
import type { WebsiteImage } from '@/api/website'

const props = withDefaults(
  defineProps<{
    images: WebsiteImage[]
    startImage?: WebsiteImage | null
    autoplay?: boolean
    hero?: boolean
    contain?: boolean
    label?: string
  }>(),
  { autoplay: false, hero: false, contain: false, label: '' },
)
const { t } = useI18n()
const index = ref(0)
const current = computed(() => props.images[index.value])
const paused = ref(false)
const hovering = ref(false)
const focused = ref(false)
const hidden = ref(false)
const reducedMotion = ref(false)
const failed = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
let media: MediaQueryList | undefined

watch(
  () => [props.images, props.startImage] as const,
  () => {
    const start = props.images.findIndex((image) => image.id === props.startImage?.id)
    index.value = Math.max(0, start)
  },
  { immediate: true },
)
watch(current, () => {
  failed.value = false
})

function move(direction: number) {
  if (props.images.length > 1)
    index.value = (index.value + direction + props.images.length) % props.images.length
}
function updateMotion() {
  reducedMotion.value = media?.matches ?? false
}
function updateVisibility() {
  hidden.value = document.hidden
}
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  updateMotion()
  updateVisibility()
  media.addEventListener('change', updateMotion)
  document.addEventListener('visibilitychange', updateVisibility)
  timer = setInterval(() => {
    if (
      props.autoplay &&
      !paused.value &&
      !hovering.value &&
      !focused.value &&
      !hidden.value &&
      !reducedMotion.value
    )
      move(1)
  }, 5000)
})
onUnmounted(() => {
  clearInterval(timer)
  media?.removeEventListener('change', updateMotion)
  document.removeEventListener('visibilitychange', updateVisibility)
})
</script>

<template>
  <div
    v-if="current"
    class="relative overflow-hidden"
    :class="hero ? 'h-full w-full bg-black' : 'w-full rounded-xl bg-gray-100'"
    role="region"
    :aria-label="label || t('gallery.label')"
    :aria-roledescription="t('gallery.label')"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @focusin="focused = true"
    @focusout="focused = false"
    @keydown.left.prevent="move(-1)"
    @keydown.right.prevent="move(1)"
  >
    <Transition name="slide-fade">
      <img
        v-if="!failed"
        :key="current.id + current.url"
        :src="current.url"
        :alt="current.alt"
        :loading="hero ? 'eager' : 'lazy'"
        :fetchpriority="hero ? 'high' : 'auto'"
        class="block h-full w-full"
        :class="contain ? 'object-contain' : 'object-cover'"
        @error="failed = true"
      />
    </Transition>
    <div
      v-if="failed"
      class="flex h-full min-h-24 items-center justify-center p-6 text-sm"
      :class="hero ? 'text-white' : 'text-gray-600'"
    >
      {{ t('gallery.unavailable') }}
    </div>
    <template v-if="images.length > 1">
      <button
        type="button"
        :aria-label="t('gallery.previous')"
        class="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white"
        @click="move(-1)"
      >
        <ChevronLeftIcon class="h-5 w-5" />
      </button>
      <button
        type="button"
        :aria-label="t('gallery.next')"
        class="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus-visible:outline-2 focus-visible:outline-white"
        @click="move(1)"
      >
        <ChevronRightIcon class="h-5 w-5" />
      </button>
      <span
        class="absolute bottom-2 right-3 rounded bg-black/50 px-2 py-1 text-xs text-white"
        :aria-live="autoplay ? 'off' : 'polite'"
        >{{ index + 1 }} / {{ images.length }}</span
      >
      <button
        v-if="autoplay && !reducedMotion"
        type="button"
        class="absolute bottom-2 left-3 rounded bg-black/50 p-2 text-white"
        :aria-label="t(paused ? 'gallery.play' : 'gallery.pause')"
        @click="paused = !paused"
      >
        <component :is="paused ? PlayIcon : PauseIcon" class="h-4 w-4" />
      </button>
    </template>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.6s ease;
}
.slide-fade-leave-active {
  position: absolute;
  inset: 0;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: none;
  }
}
</style>
