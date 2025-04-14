<script setup lang="ts">
import { computed } from 'vue'

const publications = computed(() => [
  {
    title: "Team Faabs Poster",
    year: 2024,
    pdfUrl: "/pdf/2024/Poster-TeamFaabs.pdf"
  },
  {
    title: "Team Faabs Poster",
    year: 2023,
    pdfUrl: "/pdf/2023/Poster-TeamFaabs.pdf"
  },
  {
    title: "Team Robotronic Poster",
    year: 2023,
    pdfUrl: "/pdf/2024/Robotronic-Poster-2024.pdf"
  },
  {
    title: "Team Faabs TDP",
    year: 2023,
    pdfUrl: "/pdf/2023/TDP-TeamFaabs.pdf"
  }
])
</script>

<template>
  <div class="p-6 space-y-6">
    <h2 class="text-2xl font-semibold mb-4">{{ $t('publications.title') }}</h2>

    <div v-for="pub in publications" :key="pub.pdfUrl" class="bg-white shadow-md rounded-xl p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">{{ pub.title }}</h3>
        <span class="text-gray-500 text-sm">{{ pub.year }}</span>
      </div>

      <div class="w-full h-[500px] overflow-y-scroll rounded-lg border border-gray-300 bg-white">
        <iframe
          :src="`${pub.pdfUrl}#toolbar=0`"
          type="application/pdf"
          class="w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
