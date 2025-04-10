<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const videos = computed(() => [
  {
    id: 'e9JvZN99PhQ',
    title: t('home.video_go2024'),
    description: t('home.video_go2024-description'),
  },
  {
    id: '1uGySXI9IYg',
    title: t('home.video_eo2022'),
    description: t('home.video_eo2022-description'),
  }
])

const images = ref<string[]>([
  '/images/standardIMG.png',
  '/images/2025/2025-vo-picture-05.jpg',
  '/images/2025/2025-vo-picture-06.jpg',
  '/images/2025/2025-go-picture-002.jpg',
  '/images/2025/2025-go-picture-036.jpg'
])
const currentImage = ref<number>(0)
const showBanner = ref<boolean>(true)

let intervalId: number

onMounted(() => {
  intervalId = setInterval(() => {
    currentImage.value = (currentImage.value + 1) % images.value.length
  }, 5000)
})

const infoSection = ref<HTMLDivElement | null>(null)

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const scrollDown = () => {
  infoSection.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

const name = ref<string>('')
const email = ref<string>('')
const message = ref<string>('')

const reset = () => {
  name.value = ''
  email.value = ''
  message.value = ''
}

const submit = async () => {
  try {
    await axios
      .post('https://tas.technulgy.com/api/newForm', {
        name: name.value,
        email: email.value,
        content: message.value
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status === 200) {
          alert('Form submitted successfully!')
          reset()
        } else {
          alert('Failed to submit the form. Please try again.')
        }
      })
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('An error occurred while submitting the form. Please try again later.')
  }
}

</script>

<template>
  <div class="relative h-screen overflow-hidden bg-black">
    <!-- Slideshow Container -->
    <div class="absolute inset-0">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['absolute inset-0 transition-opacity duration-2000 ease-in-out', { 'opacity-100': currentImage === index, 'opacity-0': currentImage !== index }]"
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
    <div @click="scrollDown" class="hover:cursor-pointer">
      <span class="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-xl">{{ $t('home.more') }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="absolute bottom-10 left-1/2 transform -translate-x-1/2 h-6 w-6 text-white mt-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
  </div>
  <div>
    <!-- ABOUT US SECTION -->
    <div>
      <section ref="infoSection" class="min-h-[45vh] bg-cyan1 text-white py-10 px-6 md:px-20">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold mb-6">{{ $t('home.about') }}</h2>
          <p class="text-lg leading-relaxed">
            {{ $t('home.aboutText') }}
          </p>
        </div>
      </section>
    </div>
    <!-- German Open 2025 -->
    <div>
      <section class="min-h-[60vh] bg-white py-10 px-4 md:px-16">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <!-- Image + Caption -->
          <div class="flex flex-col items-center">
            <img src="/images/2025/2025-go-picture-100.jpg" alt="three winners from rcj go 2025" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-sm text-gray-500 text-center max-w-xs">
              {{ $t('home.germanOpenCaption') }}
            </p>
          </div>

          <!-- Text -->
          <div>
            <h3 class="text-2xl font-semibold mb-2">{{ $t('home.germanOpen') }}</h3>
            <p class="text-base leading-relaxed">
              {{ $t('home.germanOpenText') }}
            </p>
          </div>
        </div>
      </section>
    </div>
    <!-- South Open 2025 -->
    <div>
      <section class="min-h-[60vh] bg-gray-50 py-10 px-4 md:px-16">
        <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <!-- Text -->
          <div>
            <h3 class="text-2xl font-semibold mb-2">{{ $t('home.southOpen') }}</h3>
            <p class="text-base leading-relaxed">
              {{ $t('home.southOpenText') }}
            </p>
          </div>
          <!-- Image + Caption -->
          <div class="flex flex-col items-center">
            <img src="/images/2025/2025-vo-picture-42.jpg" alt="all teams RCJV 2025" class="rounded-xl shadow-lg" />
            <p class="mt-4 text-sm text-gray-500 text-center max-w-xs">
              {{ $t('home.southOpenCaption') }}
            </p>
          </div>
        </div>
      </section>
    </div>
    <!-- Videos -->
    <div>
      <section class="bg-white py-12 px-4 md:px-16 text-gray-800">
        <div class="max-w-6xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-10">{{ t('home.videos') }}</h2>

          <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="video in videos"
              :key="video.id"
              class="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div class="aspect-w-16 aspect-h-9">
                <iframe
                  class="w-full h-full"
                  :src="`https://www.youtube.com/embed/${video.id}`"
                  allowfullscreen
                  :title="video.title"
                ></iframe>
              </div>
              <div class="p-4">
                <h3 class="text-lg font-semibold mb-1">{{ video.title }}</h3>
                <p class="text-sm text-gray-600">{{ video.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- Form -->
    <div>
      <section class="min-h-[60vh] bg-gray-50 py-10 px-6 md:px-20">
        <form @submit.prevent="submit" class="max-w-4xl mx-auto">
          <div class="max-w-4xl mx-auto">
            <h3 class="text-3xl font-semibold mb-4">{{ $t('home.formTitle') }}</h3>
            <p class="text-lg leading-relaxed mb-6">
              {{ $t('home.formText') }}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                v-model="name"
                type="text"
                placeholder="Name"
                class="border border-gray-300 rounded-lg p-4 bg-white"
              />
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="border border-gray-300 rounded-lg p-4 bg-white"
              />
              <textarea
                v-model="message"
                placeholder="Message"
                class="border border-gray-300 rounded-lg p-4 col-span-1 md:col-span-2 bg-white"
              ></textarea>
            </div>
            <div class="md:grid-cols-2 gap-6 py-4">
              <button
                type="submit"
                class="bg-orange-500 text-white rounded-lg py-2 px-6 hover:bg-orange-600 transition duration-200 gap-2"
              >
                {{ $t('home.formSubmit') }}
              </button>
              <button
                @click="reset"
                type="reset"
                class="bg-white text-black rounded-lg py-2 px-6 hover:bg-gray-300 transition duration-200 gap-2"
              >
                {{ $t('home.formReset') }}
              </button>
            </div>
          </div>
        </form>
      </section>
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
  animation: fade-in 3s ease-out forwards;
}
</style>
