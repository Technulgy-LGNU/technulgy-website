<script setup lang="ts">
</script>

<template>
  <div class="p-6 space-y-6">
    <h2 class="text-2xl font-semibold mb-4 content-center">{{ $t('publications.title') }}</h2>

    <!-- Papers -->
    <div>
      <section class="min-h-[60vh] bg-white py-10 px-4 md:px-16">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <!-- Image + Caption -->
          <div class="flex flex-col items-center">
            <img src="/images/2024/teamFaabs-poster.webp" alt="three winners from rcj go 2025" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-sm text-gray-500 text-center max-w-xs">
              {{ $t('publications.TDPCaption') }}
            </p>
          </div>

          <!-- Text -->
          <div>
            <h3 class="text-2xl font-semibold mb-2">{{ $t('publications.titleTDP') }}</h3>
            <p class="text-base leading-relaxed">
              {{ $t('publications.TDPText') }}
            </p>
            <a href="https://github.com/Technulgy-LGNU/OpenSource-Papers" class="hover:underline text-blue-700">OpenSource Papers</a>
          </div>
        </div>
      </section>
    </div>

    <!-- Mechanics -->
    <div>
      <section class="min-h-[60vh] bg-white py-10 px-4 md:px-16">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <!-- Text -->
          <div>
            <h3 class="text-2xl font-semibold mb-2">{{ $t('publications.titleMechanics') }}</h3>
            <p class="text-base leading-relaxed">
              {{ $t('publications.mechanicsText') }}
            </p>
            <a href="https://github.com/Technulgy-LGNU/OpenSource-Mechanics" class="hover:underline text-blue-700">OpenSource Mechanics</a>
          </div>

          <!-- Image + Caption -->
          <div class="flex flex-col items-center">
            <img src="/images/2023/HBG_v2023.webp" alt="three winners from rcj go 2025" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-sm text-gray-500 text-center max-w-xs">
              {{ $t('publications.mechanicsCaption') }}
            </p>
          </div>
        </div>
      </section>
    </div>

    <!-- Electronics -->
    <div>
      <section class="min-h-[60vh] bg-white py-10 px-4 md:px-16">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <!-- Image + Caption -->
          <div class="flex flex-col items-center">
            <img src="/images/2023/robotronic-mainboard.webp" alt="three winners from rcj go 2025" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-sm text-gray-500 text-center max-w-xs">
              {{ $t('publications.electronicsCaption') }}
            </p>
          </div>

          <!-- Text -->
          <div>
            <h3 class="text-2xl font-semibold mb-2">{{ $t('publications.titleElectronics') }}</h3>
            <p class="text-base leading-relaxed">
              {{ $t('publications.electronicsText') }}
            </p>
            <ul class="mt-4 text-xl">
              <li> - <a href="https://github.com/Technulgy-LGNU/EAGLE-LIBARIES" class="hover:underline text-blue-700">OpenSource Libraries</a></li>
              <li> - <a href="https://github.com/Technulgy-LGNU/OpenSource-Electronics" class="hover:underline text-blue-700">OpenSource Electronics</a> </li>
            </ul>

          </div>
        </div>
      </section>
    </div>

    <!-- Code -->
    <div>
      <section class="min-h-[60vh] bg-white py-10 px-4 md:px-16">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <!-- Text -->
          <div>
            <h3 class="text-2xl font-semibold mb-2">{{ $t('publications.titleSoftware') }}</h3>
            <p class="text-base leading-relaxed">
              {{ $t('publications.softwareText') }}
            </p>
            <!-- List with OpenSource Software -->
            <ul class="mt-4 text-xl">
              <li> - <a href="https://github.com/Technulgy-LGNU/OpenSource-Code" class="hover:underline text-blue-700">OpenSource Code</a> </li>
              <li> - <a href="https://github.com/Technulgy-LGNU/technulgy-website" class="hover:underline text-blue-700">Technulgy Website</a></li>
              <li> - <a href="https://github.com/Technulgy-LGNU/tas" class="hover:underline text-blue-700">Technulgy Admin Software</a> </li>
              <li> - <a href="https://github.com/Technulgy-LGNU/website" class="hover:underline text-blue-700">Old Website</a> </li>
              <li> - <a href="https://github.com/Technulgy-LGNU/RobotronicCode-2023" class="hover:underline text-blue-700">Robotronic Code 2023</a> </li>
              <li> - <a href="https://github.com/Technulgy-LGNU/rcj2023bordeaux-challange1" class="hover:underline text-blue-700">World Open 2023 Bordeaux Technical challenge vision</a> </li>
            </ul>

            <!-- Second Text -->
            <p class="text-base leading-relaxed">
              {{ $t('publications.softwareText2') }}
            </p>
          </div>

          <!-- Image + Caption -->
          <div class="flex flex-col items-center">
            <img src="/images/softwareimage.webp" alt="three winners from rcj go 2025" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-sm text-gray-500 text-center max-w-xs">
              {{ $t('publications.softwareCaption') }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>
