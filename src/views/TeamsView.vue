<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { entryImages, type Team } from '@/api/website'
import { useWebsiteContent } from '@/composables/useWebsiteContent'
import ContentState from '@/components/ContentState.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
const { t } = useI18n()
const { data: teams, loading, error, reload } = useWebsiteContent<Team[]>('teams', true)
const groups = computed(() => [
  {
    title: t('teams.active'),
    teams: teams.value?.filter((team) => team.status === 'active') ?? [],
  },
  {
    title: t('teams.inactive'),
    teams: teams.value?.filter((team) => team.status === 'retired') ?? [],
  },
])
</script>

<template>
  <section class="bg-white py-12 px-4 md:px-16 text-gray-800">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-12">{{ t('teams.title') }}</h1>
    <ContentState :loading="loading" :error="error" :empty="teams?.length === 0" @retry="reload" />
    <template v-for="group in groups" :key="group.title">
      <div v-if="group.teams.length" class="max-w-7xl mx-auto mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">{{ group.title }}</h2>
        <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="team in group.teams"
            :id="team.slug"
            :key="team.id"
            class="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col scroll-mt-6"
          >
            <ImageCarousel
              :images="entryImages(team)"
              :start-image="team.startImage || team.image"
              :label="team.name"
              class="h-48 mb-4"
            />
            <h3 class="text-xl font-semibold mb-2">{{ team.name }}</h3>
            <p class="text-sm text-gray-600 mb-4 whitespace-pre-line">{{ team.description }}</p>
            <div v-if="team.awards.length">
              <h4 class="font-medium mb-1 text-gray-700">{{ t('teams.awards') }}:</h4>
              <ul class="list-disc list-inside text-sm text-gray-700">
                <li v-for="(award, index) in team.awards" :key="`${award.eventId}-${index}`">
                  {{ award.event }} {{ award.year }} — {{ award.league }}: {{ award.result }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </template>
  </section>
</template>
