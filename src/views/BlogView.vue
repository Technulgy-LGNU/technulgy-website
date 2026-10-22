<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { entryImages, type Article } from '@/api/website'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import ContentState from '@/components/ContentState.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
const { t, locale } = useI18n()
const { data: articles, loading, error, reload } = useWebsiteContent<Article[]>('blog', true)
</script>

<template>
  <section class="bg-white py-12 px-4 md:px-16 text-gray-800">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-10">{{ t('blog.title') }}</h1>
      <ContentState
        :loading="loading"
        :error="error"
        :empty="articles?.length === 0"
        @retry="reload"
      />
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="article in articles"
          :key="article.id"
          class="bg-gray-50 rounded-2xl shadow-md p-6"
        >
          <ImageCarousel :images="entryImages(article)" :label="article.name" class="h-48 mb-4" />
          <h2 class="text-xl font-semibold mb-2">{{ article.name }}</h2>
          <p class="text-sm text-gray-600 whitespace-pre-line">{{ article.description }}</p>
          <RouterLink
            :to="{ name: 'article', params: { slug: article.slug }, query: { lang: locale } }"
            class="inline-block mt-4 text-blue-700 hover:underline"
            >{{ t('blog.readMore') }}</RouterLink
          >
        </article>
      </div>
    </div>
  </section>
</template>
