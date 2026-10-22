<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useI18n } from 'vue-i18n'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CookiesConsentComponent from '@/components/CookiesConsentComponent.vue'

const { locale } = useI18n()

const route = useRoute()
const router = useRouter()
watch(
  () => route.query.lang,
  (language) => {
    if (language === 'de' || language === 'en') locale.value = language
  },
  { immediate: true },
)
watch(
  locale,
  (language) => {
    document.documentElement.lang = language
    localStorage.setItem('lang', language)
    if (route.query.lang && route.query.lang !== language) {
      void router.replace({ query: { ...route.query, lang: language } })
    }
  },
  { immediate: true },
)

const mainContent = ref<HTMLElement | null>(null)
onMounted(() => {
  mainContent.value?.focus()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main ref="mainContent" tabindex="-1" class="flex-grow outline-none focus:outline-none">
      <RouterView />
      <CookiesConsentComponent />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped></style>
