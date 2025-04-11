<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

onMounted(() => {
  const accepted = localStorage.getItem('cookieAccepted')
  if (!accepted) {
    showBanner.value = true
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookieAccepted', 'true')
  showBanner.value = false
}
</script>

<template>
  <transition name="fade">
    <div
      v-if="showBanner"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 max-w-md bg-white shadow-lg border rounded-xl p-4 z-50"
    >
      <p class="text-sm text-gray-800 mb-4">
        {{ $t('cookies.text') }}
      </p>
      <button
        @click="acceptCookies"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
      >
        {{ $t('cookies.submit') }}
      </button>
    </div>
  </transition>
</template>

<style scoped>
</style>
