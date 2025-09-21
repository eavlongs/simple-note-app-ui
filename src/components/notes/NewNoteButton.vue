<template>
  <RouterLink :to="{ name: 'NewNote' }">
    <button class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center cursor-pointer">
      <Icon icon="ic:outline-add" width="18" height="18" class="mr-1 inline-block" />
      New Note
    </button>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
</script>
