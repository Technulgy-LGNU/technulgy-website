<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps<{ url: string; title: string }>()
const { t } = useI18n()
const loaded = ref(false)
watch(
  () => props.url,
  () => {
    loaded.value = false
  },
)
const videoId = computed(() => {
  try {
    const url = new URL(props.url)
    const id = url.searchParams.get('v') ?? ''
    return url.protocol === 'https:' &&
      ['www.youtube.com', 'youtube.com'].includes(url.hostname) &&
      url.pathname === '/watch' &&
      /^[a-zA-Z0-9_-]{11}$/.test(id)
      ? id
      : null
  } catch {
    return null
  }
})
</script>

<template>
  <div v-if="videoId" class="overflow-hidden rounded-xl bg-white shadow-sm">
    <div class="aspect-video bg-gray-800">
      <iframe
        v-if="loaded"
        class="h-full w-full"
        :src="`https://www.youtube-nocookie.com/embed/${videoId}`"
        :title="title || t('video.title')"
        allow="encrypted-media; picture-in-picture"
        allowfullscreen
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
      <button
        v-else
        type="button"
        class="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center text-white"
        @click="loaded = true"
      >
        <span class="text-3xl" aria-hidden="true">▶</span>
        <span>{{ t('video.load') }}</span>
        <span class="text-xs text-gray-300">{{ t('video.consent') }}</span>
      </button>
    </div>
    <h3 v-if="title" class="p-4 text-lg font-semibold">{{ title }}</h3>
  </div>
</template>
