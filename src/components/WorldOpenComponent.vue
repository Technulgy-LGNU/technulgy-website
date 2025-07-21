<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="fixed inset-0 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h3 class="text-lg font-semibold mb-4">World Open 2025 OpenSource Publications</h3>

      <p class="text-base leading-relaxed">
        {{ $t('publications.worldOpen') }}
      </p>
      <ul class="mt-4 text-xl">
        <li> - <a href="https://github.com/Technulgy-LGNU/OpenSource-Electronics" class="hover:underline text-blue-700">OpenSource Electronics</a> </li>
        <li> - <a href="https://github.com/Technulgy-LGNU/OpenSource-Code" class="hover:underline text-blue-700">OpenSource Code</a> </li>
        <li> - <a href="https://github.com/Technulgy-LGNU/OpenSource-Mechanics" class="hover:underline text-blue-700">OpenSource Mechanics</a></li>
        <li> - <a href="https://github.com/Technulgy-LGNU/OpenSource-Papers" class="hover:underline text-blue-700">OpenSource Papers</a></li>
      </ul>

      <div class="p-3 flex space-x-2 mt-4 justify-end">
        <button type="button" @click="emit('close')" class="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600" >Close</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
