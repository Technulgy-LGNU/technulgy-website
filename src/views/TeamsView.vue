<script setup lang="ts">
import { useI18n} from 'vue-i18n'
import { computed } from 'vue'
const { t } = useI18n()

const teamsActive = computed(() => [
  {
    name: 'Team Faabs',
    description: t('teams.teamfaabs'),
    image: '/images/teams/team-faabs.webp',
    awards: [
      t('teams.teamfaabs_wo2025'),
      t('teams.teamfaabs_wo2025-op'),
      t('teams.teamfaabs_go2025'),
      t('teams.teamfaabs_go2025-tc'),
      t('teams.teamfaabs_vo2025'),
      t('teams.teamfaabs_go2024'),
      t('teams.teamfaabs_vo2024'),
      t('teams.teamfaabs_wo2023'),
      t('teams.teamfaabs_wo2023-da'),
      t('teams.teamfaabs_go2023'),
      t('teams.teamfaabs_go2023-st'),
      t('teams.teamfaabs_vo2023'),
      t('teams.teamfaabs_eo2022'),
      t('teams.teamfaabs_go2022'),
    ]
  },
  {
    name: 'Team Mathimazierer',
    description: t('teams.mathimazierer'),
    image: '/images/teams/team-mathemazierer.webp',
    awards: [
      t('teams.mathimazierer_wo2025'),
      t('teams.mathimazierer_go2025'),
      t('teams.mathimazierer_go2025-st'),
      t('teams.mathimazierer_vo2025'),
      t('teams.mathimazierer_eo2024'),
      t('teams.mathimazierer_go2024'),
      t('teams.mathimazierer_vo2024'),
      t('teams.mathimazierer_eo2023'),
      t('teams.mathimazierer_go2023'),
      t('teams.mathimazierer_vo2023'),
    ]
  },
  {
    name: 'Team Nuttellabroetchen',
    description: t('teams.nuttellabroetchen'),
    image: '/images/teams/team-nuttellabroetchen.webp',
    awards: [
      t('teams.nuttellabroetchen_wo2025'),
      t('teams.nuttellabroetchen_wo2025-st'),
      t('teams.nuttellabroetchen_wo2025-bp'),
      t('teams.nuttellabroetchen_wo2025-bp2'),
      t('teams.nuttellabroetchen_go2025'),
      t('teams.nuttellabroetchen_vo2025'),
      t('teams.nuttellabroetchen_eo2024'),
      t('teams.nuttellabroetchen_go2024'),
      t('teams.nuttellabroetchen_vo2024'),
      t('teams.nuttellabroetchen_go2023'),
      t('teams.nuttellabroetchen_vo2023'),
      t('teams.nuttellabroetchen_go2022'),
    ]
  }
])

const teamsInactive = computed(() => [
  {
    name: 'Team Robotronic',
    description: t('teams.robotronic'),
    image: '/images/teams/team-robotronic.webp',
    awards: [
      t('teams.robotronic_go2024'),
      t('teams.robotronic_vo2024'),
      t('teams.robotronic_wo2023-st'),
      t('teams.robotronic_go2023'),
      t('teams.robotronic_go2023-st'),
      t('teams.robotronic_vo2023'),
      t('teams.robotronic_vo2019'),
    ]
  }
])
</script>

<template>
  <section class="bg-white py-12 px-4 md:px-16 text-gray-800">
    <h1 class="text-3xl md:text-4xl font-bold text-center mb-12">{{ t('teams.title') }}</h1>
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-12">{{ t('teams.active') }}</h1>

      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="team in teamsActive"
          :key="team.name"
          class="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
        >
          <img :src="team.image" :alt="team.name" class="w-full h-48 object-cover rounded-xl mb-4" />

          <h2 class="text-xl font-semibold mb-2">{{ team.name }}</h2>
          <p class="text-sm text-gray-600 mb-4">{{ team.description }}</p>

          <div>
            <h3 class="font-medium mb-1 text-gray-700">{{ t('teams.awards') }}:</h3>
            <ul class="list-disc list-inside text-sm text-gray-700">
              <li v-for="award in team.awards" :key="award">{{ award }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-center mb-5 mt-12">{{ t('teams.inactive') }}</h1>

      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="team in teamsInactive"
          :key="team.name"
          class="bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col"
        >
          <img :src="team.image" :alt="team.name" class="w-full h-48 object-cover rounded-xl mb-4" />

          <h2 class="text-xl font-semibold mb-2">{{ team.name }}</h2>
          <p class="text-sm text-gray-600 mb-4">{{ team.description }}</p>

          <div>
            <h3 class="font-medium mb-1 text-gray-700">{{ t('teams.awards') }}:</h3>
            <ul class="list-disc list-inside text-sm text-gray-700">
              <li v-for="award in team.awards" :key="award">{{ award }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
