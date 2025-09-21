<template>
  <div v-if="error" class="text-red-500 rounded-lg">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error?: string
}>()
</script>