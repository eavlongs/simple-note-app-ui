<script setup lang="ts">
import { RouterLink } from 'vue-router';
import LogOutButton from '../../LogOutButton.vue';

</script>

<template>
  <header class="w-full h-16 px-4 flex items-center justify-between border border-black">
    <RouterLink :to="{ name: 'NoteApp' }">
      <h1 class="text-2xl font-bold">Simple Note App</h1>
    </RouterLink>

    <LogOutButton />
  </header>
  <main>
    <slot />
  </main>
</template>