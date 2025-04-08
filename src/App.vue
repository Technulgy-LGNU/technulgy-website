<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'

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

const mainContent = ref<HTMLElement | null>(null)
onMounted(() =>{
  mainContent.value?.focus()
})

</script>

<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />
    <main ref="mainContent" tabindex="-1" class="flex-grow outline-none focus:outline-none">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<style scoped>
</style>
