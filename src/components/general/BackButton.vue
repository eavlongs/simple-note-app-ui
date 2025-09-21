<template>
  <button type="button" @click="handleBack"
    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200">
    Back
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = withDefaults(defineProps<{
  askConfirmation?: boolean
}>(), {
  askConfirmation: false
})

const router = useRouter()

const handleBack = () => {
  if (props.askConfirmation) {
    if (confirm('Are you sure you want to go back? Your changes will be lost.')) {
      router.back()
    }
  } else {
    router.back()
  }
}
</script>