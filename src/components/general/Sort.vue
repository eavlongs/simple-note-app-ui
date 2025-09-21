<template>
  <div class="relative">
    <Icon icon="ic:baseline-sort" width="18" height="18" class="absolute left-3 top-1/2 transform -translate-y-1/2" />
    <select v-model="selectedSortOption" @change="handleSortChange"
      class="pl-9 pr-3 py-2 border border-gray-700 rounded-md focus:ring-1 cursor-pointer">
      <option v-for="option in sortOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
export type SortField = 'createdAt' | 'updatedAt' | 'title'
export type SortOrder = 'asc' | 'desc'

export interface SortOption {
  value: string
  label: string
  field: SortField
  order: SortOrder
}

export interface SortConfig {
  field: SortField
  order: SortOrder
}

const emits = defineEmits<{
  sort: [config: SortConfig]
}>()

// Default sort option (Date Created - Descending)
const defaultSortValue = 'createdAt-desc'
const selectedSortOption = ref(defaultSortValue)

const sortOptions: SortOption[] = [
  {
    value: 'createdAt-desc',
    label: 'Date Created (Newest First)',
    field: 'createdAt',
    order: 'desc'
  },
  {
    value: 'createdAt-asc',
    label: 'Date Created (Oldest First)',
    field: 'createdAt',
    order: 'asc'
  },
  {
    value: 'updatedAt-desc',
    label: 'Last Modified (Newest First)',
    field: 'updatedAt',
    order: 'desc'
  },
  {
    value: 'updatedAt-asc',
    label: 'Last Modified (Oldest First)',
    field: 'updatedAt',
    order: 'asc'
  },
  {
    value: 'title-asc',
    label: 'Title (A to Z)',
    field: 'title',
    order: 'asc'
  },
  {
    value: 'title-desc',
    label: 'Title (Z to A)',
    field: 'title',
    order: 'desc'
  }
]

const currentSortConfig = computed((): SortConfig => {
  const option = sortOptions.find(opt => opt.value === selectedSortOption.value)
  return {
    field: option?.field || 'createdAt',
    order: option?.order || 'desc'
  }
})

const handleSortChange = () => {
  emits('sort', currentSortConfig.value)
}
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>