<script setup lang="ts">
const sponsors = [
  {
    name: 'Celos',
    logo: '/images/sponsors/celos.webp',
    url: 'https://celos.de',
  },
  {
    name: 'Multivac',
    logo: '/images/sponsors/logo-multivac-blue.webp',
    url: 'https://www.multivac.com/de/',
  },
  {
    name: 'Blech & Technik',
    logo: '/images/sponsors/bt_logo.webp',
    url: 'https://www.blechundtechnik.de/',
  },
  {
    name: 'Ulm Digital',
    logo: '/images/sponsors/ulmdigital-2.webp',
    url: 'https://ulm-digital.com/',
  },
  {
    name: 'Wieland',
    logo: '/images/sponsors/logo_wieland.webp',
    url: 'https://www.wieland.com/de/',
  },
  {
    name: 'Settele Spätzle',
    logo: '/images/sponsors/settele.webp',
    url: 'https://settele.de',
  },
  {
    name: 'Hensoldt',
    logo: '/images/sponsors/hensoldt.webp',
    url: 'https://hensoldt.net',
  },
  {
    name: 'VDMA',
    logo: '/images/sponsors/vdma.webp',
    url: 'https://vdma.eu',
  },
  {
    name: 'ZwickRoll',
    logo: '/images/sponsors/zwickroll.webp',
    url: 'https://www.zwickroell.com/de/',
  },
  {
    name: 'Maxon Motors',
    logo: '/images/sponsors/maxonmoters.webp',
    url: 'https://www.maxongroup.com/de-de',
  },
  {
    name: 'Würth Elektronik',
    logo: '/images/sponsors/wuerth.webp',
    url: 'https://www.we-online.com/en/',
  },
  {
    name: 'Sparkasse Neu-Ulm Illertissen',
    logo: '/images/sponsors/sparkasseneuulm.webp',
    url: 'https://www.sparkasse-neu-ulm-illertissen.de/de/home.html',
  },
  {
    name: 'VDI',
    logo: '/images/sponsors/vdi.webp',
    url: 'https://vdi.de',
  },
  {
    name: 'Deloitte Innowake',
    logo: '/images/sponsors/deloitteinnowake.webp',
    url: 'https://career.deloitte-innowake.de/',
  },
  {
    name: 'Utzin Utz',
    logo: '/images/sponsors/utzinutz.webp',
    url: 'https://deutzin-utz.com',
  },
  {
    name: 'Mädler',
    logo: '/images/sponsors/maedler.webp',
    url: 'https://maedler.de',
  },
  {
    name: 'Bosch Rexroth',
    logo: '/images/sponsors/boschrexroth.webp',
    url: 'https://www.boschrexroth.com/de/de/',
  },
  {
    name: 'VR-Bank Neu-Ulm',
    logo: '/images/sponsors/vrbankneuulm.webp',
    url: 'https://vrnu.de',
  },
  {
    name: 'Multi CB',
    logo: '/images/sponsors/multicb.webp',
    url: 'https://www.multicb.com/',
  },
  {
    name: 'Molex',
    logo: '/images/sponsors/molex.webp',
    url: 'https://www.molex.de/',
  },
  {
    name: 'Wefer 3D',
    logo: '/images/sponsors/wefer3d.webp',
    url: 'https://wefer3d.com/',
  },
  {
    name: 'Hoise & Span',
    logo: '/images/sponsors/hoise_span.webp',
    url: 'https://www.hoeise-span.de/',
  },
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

<style scoped></style>
