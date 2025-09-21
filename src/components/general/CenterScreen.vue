<template>
  <div class="flex items-center justify-center h-[calc(100vh-4rem)]" v-if="withLayout">
    <slot />
  </div>
  <div class="flex items-center justify-center" v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  withLayout?: boolean
}>(), {
  withLayout: true,
})
</script>