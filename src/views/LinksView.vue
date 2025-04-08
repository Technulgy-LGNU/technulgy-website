<script setup lang="ts">
import { GitHubIcon, InstagramIcon, GoogleChromeIcon, YouTubeIcon } from 'vue3-simple-icons'
import { EnvelopeIcon } from '@heroicons/vue/24/solid'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const links = [
  { name: 'GitHub', url: 'https://github.com/technulgy-lgnu', icon: GitHubIcon },
  { name: t('links.school'), url: 'https://lgnu.de', icon: GoogleChromeIcon },
  { name: 'Official YouTube', url: 'https://www.youtube.com/@Technulgy', icon: YouTubeIcon },
  { name: 'Instagram Team Faabs', url: 'https://instagram.com/yourhandle', icon: InstagramIcon },
  {
    name: 'Instagram Team Mathemazierer',
    url: 'https://instagram.com/yourhandle',
    icon: InstagramIcon,
  },
  {
    name: 'Instagram Team Nuttellabroetchen',
    url: 'https://instagram.com/yourhandle',
    icon: InstagramIcon,
  },
  {
    name: 'Instagram Team Robotronic',
    url: 'https://instagram.com/yourhandle',
    icon: InstagramIcon,
  },
  { name: 'Instagram Team Nebula', url: 'https://instagram.com/yourhandle', icon: InstagramIcon },
  { name: 'Email', url: 'mailto:contact@technulgy.com', icon: EnvelopeIcon },
]
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-6 py-12 space-y-10"
  >
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-2">{{ $t('links.title') }}</h1>
      <p class="text-lg text-gray-400">{{ $t('links.title2') }}</p>
    </div>

    <div class="flex flex-col gap-4 w-full max-w-md">
      <a
        v-for="link in links"
        :key="link.name"
        :href="link.url"
        target="_blank"
        class="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300"
      >
        <component :is="link.icon" class="w-6 h-6 text-white" />
        <span class="text-lg">{{ link.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped></style>
