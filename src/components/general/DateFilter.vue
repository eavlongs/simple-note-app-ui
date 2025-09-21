<template>
  <div class="relative">
    <Icon icon="ic:outline-date-range" width="18" height="18"
      class="absolute left-3 top-1/2 transform -translate-y-1/2" />
    <select v-model="selectedDateFilter" @change="handleDateFilterChange"
      class="pl-9 pr-8 py-2 border border-gray-700 rounded-md focus:ring-1 cursor-pointer">
      <option v-for="option in dateFilterOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

export interface DateFilterOption {
  value: string
  label: string
  days?: number
}

export interface DateFilterConfig {
  days?: number // undefined means "all time"
}

const emits = defineEmits<{
  dateFilter: [config: DateFilterConfig]
}>()

// Default filter option (All time)
const defaultFilterValue = 'all-time'
const selectedDateFilter = ref(defaultFilterValue)

const dateFilterOptions: DateFilterOption[] = [
  {
    value: 'last-7-days',
    label: 'Last 7 days',
    days: 7
  },
  {
    value: 'last-30-days',
    label: 'Last 30 days',
    days: 30
  },
  {
    value: 'all-time',
    label: 'All time'
  }
]

const currentDateFilterConfig = computed((): DateFilterConfig => {
  const option = dateFilterOptions.find(opt => opt.value === selectedDateFilter.value)
  return {
    days: option?.days
  }
})

const handleDateFilterChange = () => {
  emits('dateFilter', currentDateFilterConfig.value)
}

// Emit the default filter configuration on component mount
handleDateFilterChange()
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
