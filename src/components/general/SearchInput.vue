<template>
  <div class="relative">
    <Icon icon="ic:outline-search" width="20" height="20"
      class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    <input v-model="searchTerm" type="text" placeholder="Search notes..."
      class="pl-10 pr-4 py-2 border border-gray-700 rounded-md" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import { useDebounce } from "@/lib/utils";

const searchTerm = ref('')
const emits = defineEmits(["search"])

const debouncedSearch = useDebounce((value: string) => {
  emits('search', value)
}, 500)

watch(searchTerm, (newValue) => {
  debouncedSearch(newValue)
})
</script>