<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { entryImages, type Home } from '@/api/website'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import ContentState from '@/components/ContentState.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import YouTubeVideo from '@/components/YouTubeVideo.vue'
import ContactForm from '@/components/ContactForm.vue'
const { t, locale } = useI18n()
const { data: home, loading, error, reload } = useWebsiteContent<Home>('home')
const infoSection = ref<HTMLElement | null>(null)
function scrollDown() {
  infoSection.value?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
}
</script>

<template>
  <ContentState :loading="loading" :error="error" @retry="reload" />
  <template v-if="home">
    <div class="relative h-screen overflow-hidden bg-black">
      <ImageCarousel :images="home.images" autoplay hero :label="t('nav.home')" />
      <h1
        class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold drop-shadow-lg"
      >
        TECHNULGY
      </h1>
      <button
        type="button"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xl text-center"
        @click="scrollDown"
      >
        {{ t('home.more')
        }}<span class="block mt-2 motion-safe:animate-bounce" aria-hidden="true">↓</span>
      </button>
    </div>
    <section ref="infoSection" class="min-h-[45vh] bg-cyan1 text-white py-10 px-6 md:px-20">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6">{{ t('home.about') }}</h2>
        <p class="text-lg leading-relaxed whitespace-pre-line">{{ home.aboutUs }}</p>
      </div>
    </section>
    <section
      v-for="(article, index) in home.blogs"
      :key="article.id"
      class="min-h-[60vh] py-10 px-4 md:px-16"
      :class="index % 2 ? 'bg-gray-50' : 'bg-white'"
    >
      <div
        class="max-w-6xl mx-auto grid gap-6 items-start"
        :class="entryImages(article).length ? 'md:grid-cols-2' : ''"
      >
        <div>
          <h2 class="text-2xl font-semibold mb-2">{{ article.name }}</h2>
          <p class="text-base leading-relaxed whitespace-pre-line">{{ article.description }}</p>
          <RouterLink
            :to="{ name: 'article', params: { slug: article.slug }, query: { lang: locale } }"
            class="inline-block mt-4 text-blue-700 hover:underline"
            >{{ t('blog.readMore') }}</RouterLink
          >
        </div>
        <ImageCarousel
          :images="entryImages(article)"
          :label="article.name"
          autoplay
          class="aspect-[4/3] shadow-lg"
          :class="index % 2 ? 'md:order-first' : ''"
        />
      </div>
    </section>
    <div v-if="home.blogs.length" class="pb-8 text-center">
      <RouterLink
        :to="{ name: 'blog', query: { lang: locale } }"
        class="text-blue-700 hover:underline"
        >{{ t('blog.all') }}</RouterLink
      >
    </div>
    <section v-if="home.videos.length" class="bg-white py-12 px-4 md:px-16 text-gray-800">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-10">{{ t('home.videos') }}</h2>
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <YouTubeVideo
            v-for="video in home.videos"
            :key="video.url"
            :url="video.url"
            :title="video.title"
          />
        </div>
      </div>
    </section>
    <ContactForm :enabled="home.contact.enabled" />
  </template>
</template>
