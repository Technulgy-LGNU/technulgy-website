<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ApiError, sendContact } from '@/api/website'
const props = defineProps<{ enabled: boolean }>()
const { t, locale } = useI18n()
const fields = reactive({ name: '', email: '', subject: '', message: '', website: '' })
const sending = ref(false)
const result = ref('')
const success = ref(false)
const resultText = computed(() => (result.value ? t(`contact.${result.value}`) : ''))
function reset() {
  Object.assign(fields, { name: '', email: '', subject: '', message: '', website: '' })
  result.value = ''
}
async function submit() {
  if (sending.value || !props.enabled) return
  sending.value = true
  result.value = ''
  success.value = false
  try {
    if (new TextEncoder().encode(JSON.stringify(fields)).length > 20 * 1024) {
      result.value = 'tooLarge'
      return
    }
    await sendContact({ ...fields }, locale.value === 'de' ? 'de' : 'en')
    reset()
    success.value = true
    result.value = 'success'
  } catch (error) {
    const messages: Record<number, string> = {
      400: 'invalid',
      413: 'tooLarge',
      415: 'error',
      429: 'rateLimit',
      503: 'unavailable',
      502: 'error',
    }
    result.value = error instanceof ApiError ? messages[error.status] || 'error' : 'error'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contact" class="min-h-[60vh] bg-gray-50 py-10 px-6 md:px-20">
    <form class="max-w-4xl mx-auto" @submit.prevent="submit" @reset.prevent="reset">
      <h2 class="text-3xl font-semibold mb-4">{{ t('home.formTitle') }}</h2>
      <p class="text-lg leading-relaxed mb-6">{{ t('home.formText') }}</p>
      <p v-if="!enabled" class="mb-6 text-gray-600">
        {{ t('contact.unavailable') }}
        <a class="text-blue-700 underline" href="mailto:contact@technulgy.com"
          >contact@technulgy.com</a
        >
      </p>
      <fieldset :disabled="!enabled || sending" class="disabled:opacity-60">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label class="grid gap-2"
            >{{ t('contact.name')
            }}<input
              v-model="fields.name"
              name="name"
              autocomplete="name"
              required
              maxlength="200"
              class="border border-gray-300 rounded-lg p-4 bg-white"
          /></label>
          <label class="grid gap-2"
            >{{ t('contact.email')
            }}<input
              v-model="fields.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              maxlength="254"
              class="border border-gray-300 rounded-lg p-4 bg-white"
          /></label>
          <label class="grid gap-2 md:col-span-2"
            >{{ t('contact.subject')
            }}<input
              v-model="fields.subject"
              name="subject"
              required
              maxlength="200"
              class="border border-gray-300 rounded-lg p-4 bg-white"
          /></label>
          <label class="grid gap-2 md:col-span-2"
            >{{ t('contact.message')
            }}<textarea
              v-model="fields.message"
              name="message"
              required
              maxlength="10000"
              rows="5"
              class="border border-gray-300 rounded-lg p-4 bg-white"
            ></textarea>
          </label>
          <div class="absolute -left-[10000px]" aria-hidden="true">
            <label
              >Website<input
                v-model="fields.website"
                name="website"
                tabindex="-1"
                autocomplete="off"
            /></label>
          </div>
        </div>
        <div class="flex gap-3 py-4">
          <button
            type="submit"
            class="bg-orange-500 text-white rounded-lg py-2 px-6 hover:bg-orange-600"
          >
            {{ t(sending ? 'contact.sending' : 'home.formSubmit') }}
          </button>
          <button type="reset" class="bg-white text-black rounded-lg py-2 px-6 hover:bg-gray-300">
            {{ t('home.formReset') }}
          </button>
        </div>
      </fieldset>
      <p
        v-if="result"
        role="status"
        aria-live="polite"
        :class="success ? 'text-green-700' : 'text-red-700'"
      >
        {{ resultText }}
      </p>
    </form>
  </section>
</template>
