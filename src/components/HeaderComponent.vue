<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const mobileMenuOpen = ref<boolean>(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

const { t, locale } = useI18n()

const isEnglish = computed({
  get: () => locale.value === 'en',
  set: (value: boolean) => {
    locale.value = value ? 'en' : 'de';
    switchLanguage()
  }
})

async function switchLanguage() {
  document.querySelector('html')?.setAttribute('lang', locale.value)
  localStorage.setItem('lang', locale.value)
}
</script>

<template>
  <header class="w-full bg-gray-800 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
      <!-- Logo -->
      <router-link to="/" class="text-xl font-semibold">
        Technulgy
      </router-link>

      <!-- Navigation (Desktop) -->
      <nav class="hidden md:flex space-x-6">
        <router-link to="/" class="hover:text-gray-300" >{{ t('nav.home')}}</router-link>
        <router-link to="/teams" class="hover:text-gray-300" >Teams</router-link>
        <router-link to="/participationHistory" class="hover:text-gray-300" >{{ t('nav.partHistory') }}</router-link>
        <router-link to="/sponsors" class="hover:text-gray-300" >{{ t('nav.sponsors') }}</router-link>
        <router-link to="/publications" class="hover:text-gray-300" >{{ t('nav.publications') }}</router-link>
        <router-link to="/links" class="hover:text-gray-300" >Links</router-link>
        <router-link to="/Impressum" class="hover:text-gray-300" >Impressum</router-link>
      </nav>

      <!-- Right Section: Language Switcher & Mobile Menu Button -->
      <div class="flex items-center space-x-2">
        <span>🇩🇪</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            class="sr-only peer"
            v-model="isEnglish"
          />
          <div
            class="w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-500 transition duration-300"
          ></div>
          <div
            class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform duration-300"
          ></div>
        </label>
        <span>🇬🇧</span>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden text-white text-2xl">
        ☰
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-gray-700 py-3">
      <router-link to="/" class="hover:text-gray-300" >Home</router-link>
      <router-link to="/teams" class="hover:text-gray-300" >Teams</router-link>
      <router-link to="/participationHistory" class="hover:text-gray-300" >Participation History</router-link>
      <router-link to="/sponsors" class="hover:text-gray-300" >Sponsors</router-link>
      <router-link to="/publications" class="hover:text-gray-300" >Publications</router-link>
      <router-link to="/links" class="hover:text-gray-300" >Links</router-link>
      <router-link to="/Impressum" class="hover:text-gray-300" >Impressum</router-link>
    </div>
  </header>
</template>

<style scoped>

</style>
