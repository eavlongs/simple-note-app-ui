<template>
  <div class="flex justify-between text-sm text-gray-500 my-2">
    <span>Characters: {{ value.length }}
      <span v-if="maxLength !== undefined">
        {{ " / " + maxLength }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
  maxLength?: number
}>()
</script>