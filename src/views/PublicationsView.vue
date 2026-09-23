<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { entryImages, httpsUrl, type Entry } from '@/api/website'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import ContentState from '@/components/ContentState.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
const { t } = useI18n()
const {
  data: publications,
  loading,
  error,
  reload,
} = useWebsiteContent<Entry[]>('publications', true)
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-semibold mb-4">{{ t('publications.title') }}</h1>
    <ContentState
      :loading="loading"
      :error="error"
      :empty="publications?.length === 0"
      @retry="reload"
    />
    <section
      v-for="(publication, index) in publications"
      :key="publication.id"
      class="min-h-[60vh] bg-white py-10 px-4 md:px-16"
    >
      <div
        class="max-w-6xl mx-auto grid gap-6 items-start"
        :class="entryImages(publication).length ? 'md:grid-cols-2' : ''"
      >
        <div>
          <h2 class="text-2xl font-semibold mb-2">{{ publication.name }}</h2>
          <p class="text-base leading-relaxed whitespace-pre-line">{{ publication.description }}</p>
          <a
            v-if="httpsUrl(publication.url)"
            :href="httpsUrl(publication.url)"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-4 hover:underline text-blue-700"
            >{{ t('publications.open') }}</a
          >
        </div>
        <ImageCarousel
          :images="entryImages(publication)"
          :label="publication.name"
          contain
          class="aspect-[4/3] shadow-lg"
          :class="index % 2 === 0 ? 'md:order-first' : ''"
        />
      </div>
    </section>
  </div>
</template>
