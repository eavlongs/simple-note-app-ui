<template>
  <div>
    <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
      Content
    </label>
    <textarea id="content" v-model="model" placeholder="Write your note content here..." rows="12"
      :maxlength="MAX_NOTE_CONTENT_LENGTH"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical min-h-[200px]"
      :class="{ 'border-red-500': error }"></textarea>
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { MAX_NOTE_CONTENT_LENGTH } from '@/lib/constants';
import { defineModel } from 'vue';

const props = withDefaults(defineProps<{
  error?: string
}>(), {
  error: ""
})

const model = defineModel<string>()
</script>