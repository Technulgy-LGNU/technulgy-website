<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { entryImages, httpsUrl, type Entry } from '@/api/website'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import ContentState from '@/components/ContentState.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
const { t } = useI18n()
const { data: sponsors, loading, error, reload } = useWebsiteContent<Entry[]>('sponsors', true)
</script>

<template>
  <section class="bg-gray-100 py-10 px-4 md:px-16">
    <div class="max-w-6xl mx-auto text-center">
      <h1 class="text-2xl md:text-3xl font-semibold mb-6">{{ t('sponsors.title') }}</h1>
      <ContentState
        :loading="loading"
        :error="error"
        :empty="sponsors?.length === 0"
        @retry="reload"
      />
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-start">
        <article
          v-for="sponsor in sponsors"
          :key="sponsor.id"
          class="min-w-0 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
        >
          <ImageCarousel
            :images="entryImages(sponsor)"
            :label="sponsor.name"
            contain
            class="h-20 mb-3"
          />
          <h2 class="font-semibold break-words">
            <a
              v-if="httpsUrl(sponsor.url)"
              :href="httpsUrl(sponsor.url)"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:underline"
              >{{ sponsor.name }}</a
            ><span v-else>{{ sponsor.name }}</span>
          </h2>
          <p
            v-if="sponsor.description"
            class="mt-2 text-sm text-gray-600 whitespace-pre-line break-words"
          >
            {{ sponsor.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
  <section class="bg-gray-50 py-10 px-4 md:px-16">
    <div class="max-w-6xl mx-auto text-center">
      <p class="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">{{ t('sponsors.text') }}</p>
      <div class="mt-6">
        <a
          class="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          href="mailto:contact@technulgy.com"
          >{{ t('sponsors.button') }}</a
        >
      </div>
    </div>
  </section>
</template>
