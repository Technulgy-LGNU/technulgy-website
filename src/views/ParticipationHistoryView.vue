<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { entryImages, type Competition } from '@/api/website'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import ContentState from '@/components/ContentState.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
const { t } = useI18n()
const {
  data: events,
  loading,
  error,
  reload,
} = useWebsiteContent<Competition[]>('participation-history', true)
</script>

<template>
  <section class="bg-white py-12 px-4 md:px-16 text-gray-800">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-10">{{ t('partHistory.title') }}</h1>
      <ContentState
        :loading="loading"
        :error="error"
        :empty="events?.length === 0"
        @retry="reload"
      />
      <div class="space-y-10">
        <article
          v-for="event in events"
          :key="event.id"
          class="border rounded-xl shadow-sm hover:shadow-md transition p-6"
        >
          <div class="mb-4">
            <h2 class="text-xl font-semibold">
              {{ event.name }} <span class="text-gray-500">({{ event.year }})</span>
            </h2>
            <p class="text-sm text-gray-600 whitespace-pre-line">{{ event.description }}</p>
          </div>
          <div v-if="event.results.length" class="mb-4">
            <h3 class="font-medium mb-1">{{ t('teams.awards') }}:</h3>
            <ul class="list-disc list-inside text-sm text-gray-700">
              <li
                v-for="(result, index) in event.results"
                :key="`${result.teamId}-${index}`"
                class="mb-1"
              >
                <strong>{{ result.team }}</strong
                >: {{ result.league }} — {{ result.result }}
              </li>
            </ul>
          </div>
          <ImageCarousel
            :images="entryImages(event)"
            :label="event.name"
            class="aspect-video max-h-[32rem] shadow"
          />
        </article>
      </div>
    </div>
  </section>
</template>
