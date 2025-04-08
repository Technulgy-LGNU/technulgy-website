<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const images = ref<string[]>([
  'images/standardIMG.png',
  'images/20250223_PT_RobocupVöhringen-05.jpg',
  'images/20250223_PT_RobocupVöhringen-06.jpg'
])
const currentImage = ref<number>(0)
const showBanner = ref<boolean>(true)

let intervalId: number

onMounted(() => {
  intervalId = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.value.length
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})


</script>

<template>
  <div class="relative h-screen overflow-hidden bg-black">
    <!-- Slideshow Container -->
    <div class="absolute inset-0">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['absolute inset-0 transition-opacity duration-1000 ease-in-out', { 'opacity-100': currentImage === index, 'opacity-0': currentImage !== index }]"
        :style="`background-image: url(${image}); background-size: cover; background-position: center center;`"
      ></div>
    </div>

    <!-- Technulgy Banner -->
    <div
      v-if="showBanner"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-6xl font-bold animate-fade-in">
      TECHNULGY
    </div>

    <!-- Scroll Arrow -->
    <div>
      <span class="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xl">{{ $t('home.more') }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-10 left-1/2 transform -translate-x-1/2 h-6 w-6 text-white mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
</style>
