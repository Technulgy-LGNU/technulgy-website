<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { entryImages, type ArticleDetail } from '@/api/website'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import { renderMarkdown } from '@/lib/markdown'
import ContentState from '@/components/ContentState.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import YouTubeVideo from '@/components/YouTubeVideo.vue'
const route = useRoute()
const { t, locale } = useI18n()
const path = computed(() => `blog/${encodeURIComponent(String(route.params.slug))}`)
const { data: article, loading, error, reload } = useWebsiteContent<ArticleDetail>(path)
const publishedDate = computed(() =>
  article.value
    ? new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(
        new Date(article.value.publishedAt),
      )
    : '',
)
</script>

<template>
  <section class="bg-white py-12 px-4 md:px-16 text-gray-800">
    <div class="max-w-4xl mx-auto">
      <RouterLink
        :to="{ name: 'blog', query: { lang: locale } }"
        class="text-blue-700 hover:underline"
        >← {{ t('blog.all') }}</RouterLink
      >
      <ContentState :loading="loading" :error="error" @retry="reload" />
      <article v-if="article" class="mt-8">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ article.name }}</h1>
        <time :datetime="article.publishedAt" class="text-sm text-gray-500">{{
          publishedDate
        }}</time>
        <p class="my-6 text-lg leading-relaxed whitespace-pre-line">{{ article.description }}</p>
        <ImageCarousel
          :images="entryImages(article)"
          :label="article.name"
          class="aspect-video shadow-lg mb-10"
        />
        <div class="space-y-8">
          <template v-for="block in article.blocks" :key="block.id">
            <component
              :is="block.level === 3 ? 'h3' : 'h2'"
              v-if="block.type === 'heading'"
              class="font-semibold"
              :class="block.level === 3 ? 'text-xl' : 'text-2xl'"
              >{{ block.text }}</component
            >
            <div
              v-else-if="block.type === 'text'"
              class="article-markdown"
              v-html="renderMarkdown(block.text)"
            ></div>
            <figure v-else-if="block.type === 'image' || block.type === 'gallery'">
              <ImageCarousel
                :images="block.images"
                :label="block.text || article.name"
                contain
                class="aspect-[4/3] shadow-lg"
              />
              <figcaption
                v-if="block.text"
                class="mt-4 text-sm text-gray-500 text-center whitespace-pre-line"
              >
                {{ block.text }}
              </figcaption>
            </figure>
            <YouTubeVideo
              v-else-if="block.type === 'video'"
              :url="block.url"
              :title="block.text || ''"
            />
          </template>
        </div>
      </article>
    </div>
  </section>
</template>

<style>
.article-markdown {
  line-height: 1.75;
  overflow-wrap: anywhere;
}
.article-markdown > * + * {
  margin-top: 1rem;
}
.article-markdown a {
  color: #1d4ed8;
  text-decoration: underline;
}
.article-markdown ul {
  list-style: disc;
  padding-left: 1.5rem;
}
.article-markdown ol {
  list-style: decimal;
  padding-left: 1.5rem;
}
.article-markdown pre {
  overflow-x: auto;
  padding: 1rem;
  border-radius: 0.75rem;
  background: #f3f4f6;
}
.article-markdown code {
  background: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}
.article-markdown blockquote {
  border-left: 3px solid #21b2a6;
  padding-left: 1rem;
  color: #4b5563;
}
.article-markdown h2,
.article-markdown h3 {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
