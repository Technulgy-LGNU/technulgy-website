<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

if (localStorage.getItem('lang') === null) {
  if (window.navigator.language === 'de') {
    locale.value = 'de'
    document.querySelector('html')?.setAttribute('lang', 'de')
    localStorage.setItem('lang', 'de')
  } else {
    locale.value = 'en'
    document.querySelector('html')?.setAttribute('lang', 'en')
    localStorage.setItem('lang', 'en')
  }
}

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main class="flex-grow">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
</style>
