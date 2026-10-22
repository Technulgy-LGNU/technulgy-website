<script setup lang="ts">
import { useI18n } from 'vue-i18n'
defineProps<{ loading: boolean; error: 'notFound' | 'loadError' | null; empty?: boolean }>()
defineEmits<{ retry: [] }>()
const { t } = useI18n()
</script>

<template>
  <div
    v-if="loading || error || empty"
    class="max-w-4xl mx-auto px-6 py-16 text-center"
    role="status"
    aria-live="polite"
  >
    <p :class="error ? 'text-red-700' : 'text-gray-600'">
      {{ t(`content.${loading ? 'loading' : error || 'empty'}`) }}
    </p>
    <button
      v-if="error"
      type="button"
      class="mt-4 rounded-lg bg-cyan1 px-5 py-2 text-white"
      @click="$emit('retry')"
    >
      {{ t('content.retry') }}
    </button>
  </div>
</template>
