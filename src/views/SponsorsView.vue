<script setup lang="ts">
const sponsors = [
  {
    name: 'Blech & Technik',
    logo: '/images/sponsors/bt_logo.jpg',
    url: 'https://www.blechundtechnik.de/'
  },
  {
    name: 'Multivac',
    logo: '/images/sponsors/logo-multivac-blue.jpg',
    url: 'https://www.multivac.com/de/'
  },
  {
    name: 'Wieland',
    logo: '/images/sponsors/logo_wieland.jpg',
    url: 'https://www.wieland.com/de/'
  },
  {
    name: 'Maxon Motors',
    logo: '/images/sponsors/maxonmoters.jpg',
    url: 'https://www.maxongroup.com/de-de'
  },
  {
    name: 'Ulm Digital',
    logo: '/images/sponsors/ulmdigital.jpg',
    url: 'https://ulm-digital.com/'
  },
  {
    name: 'ZwickRoll',
    logo: '/images/sponsors/zwickroll.jpg',
    url: 'https://www.zwickroell.com/de/'
  },
  {
    name: 'Multi CB',
    logo: '/images/sponsors/multicb.jpg',
    url: 'https://www.multicb.com/'
  }
]
</script>

<template>
  <!-- SPONSORS SECTION -->
  <section class="bg-gray-100 py-10 px-4 md:px-16">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-2xl md:text-3xl font-semibold mb-6">{{ $t('sponsors.title') }}</h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-center">
        <a
          v-for="sponsor in sponsors"
          :key="sponsor.name"
          :href="sponsor.url"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
        >
          <img :src="sponsor.logo" :alt="sponsor.name" class="max-h-12 object-contain" />
        </a>
      </div>
    </div>
  </section>
  <section class="bg-gray-50 py-10 px-4 md:px-16">
    <div class="max-w-6xl mx-auto text-center">
      <!-- Appreciation Text -->
      <p class="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
        {{ $t('sponsors.text') }}
      </p>

      <!-- Contact Button -->
      <div class="mt-6">
        <a
          class="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          href="mailto:contact@technulgy.com"
        >
          {{ $t('sponsors.button') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
