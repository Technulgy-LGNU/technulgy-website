<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const history = computed(() => [
  {
    name: t('partHistory.go'),
    year: 2025,
    location: t('partHistory.nuremberg'),
    awards: [
      { team: 'Team Faabs', title: t('teams.teamfaabs_go2025') },
      { team: 'Team Faabs', title: t('teams.teamfaabs_go2025-tc') },
      { team: 'Team Mathimazierer', title: t('teams.mathimazierer_go2025')},
      { team: 'Team Nuttellabroetchen', title: t('teams.nuttellabroetchen_go2025')}
    ],
    images: [
      '/images/2025/2025-go-picture-100.jpg',
      '/images/2025/2025-go-picture-002.jpg',
      '/images/2025/2025-go-picture-036.jpg'
    ]
  },
  {
    name: t('partHistory.vo'),
    year: 2025,
    location: 'Vöhringen',
    awards: [
      { team: 'Team Faabs', title: t('teams.teamfaabs_vo2025') },
      { team: 'Team Mathimazierer', title: t('teams.mathimazierer_vo2025')},
      { team: 'Team Nuttellabroetchen', title: t('teams.nuttellabroetchen_vo2025')}
    ],
    images: [
      '/images/2025/2025-vo-picture-42.jpg',
      '/images/2025/2025-vo-picture-05.jpg',
      '/images/2025/2025-vo-picture-06.jpg'
    ]
  }
])
</script>

<template>
    <section class="bg-white py-12 px-4 md:px-16 text-gray-800">
      <div class="max-w-6xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-center mb-10">{{ t('partHistory.title') }}</h1>

        <div class="space-y-10">
          <div
            v-for="event in history"
            :key="event.name"
            class="border rounded-xl shadow-sm hover:shadow-md transition p-6"
          >
            <div class="mb-4">
              <h2 class="text-xl font-semibold">{{ event.name }} <span class="text-gray-500">({{ event.year }})</span></h2>
              <p class="text-sm text-gray-600">{{ event.location }}</p>
            </div>

            <!-- AWARDS -->
            <div class="mb-4">
              <h3 class="font-medium mb-1">{{ t('teams.awards') }}:</h3>
              <ul class="list-disc list-inside text-sm text-gray-700">
                <li
                  v-for="award in event.awards"
                  :key="award.team"
                  class="mb-1"
                >
                  <strong>{{ award.team }}</strong>: {{ award.title }}
                </li>
              </ul>
            </div>

            <!-- IMAGES -->
            <div v-if="event.images && event.images.length" class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <img
                v-for="(img, index) in event.images"
                :key="index"
                :src="img"
                alt="Event image"
                class="rounded-lg shadow object-cover h-40 w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<style scoped>

</style>
