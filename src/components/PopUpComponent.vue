<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    default: 'Default Title'
  },
  message: {
    type: String,
    default: 'Default Message'
  },
  show: {
    type: Boolean,
    default: false
  }})

</script>

<template>
<div v-if="props.show">

</div>
</template>

<style scoped>

</style>
