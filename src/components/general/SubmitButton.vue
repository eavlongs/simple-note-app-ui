<template>
  <button type="submit" :disabled="disabled"
    class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed">
    <span v-if="!isSubmitting">{{ text }}</span>
    <span v-else class="flex items-center justify-center">
      <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      {{ submittingText }}
    </span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean
  isSubmitting?: boolean
  text: string
  submittingText?: string
}>(), {
  disabled: false,
  isSubmitting: false,
  submittingText: "Submitting..."
})
</script>