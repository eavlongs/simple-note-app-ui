<template>
  <div>
    <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
      Title
    </label>
    <input id="title" v-model="model" type="text" placeholder="Enter note title..." required
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      :class="{ 'border-red-500': error }" />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

const props = withDefaults(defineProps<{
  error?: string
}>(), {
  error: ""
})

const model = defineModel<string>()
</script>