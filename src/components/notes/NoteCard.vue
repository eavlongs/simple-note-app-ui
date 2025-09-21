<template>
  <div class="rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-400
    overflow-hidden min-h-[150px] relative group">

    <RouterLink :to="{ name: 'NoteDetail', params: { id: note.id } }" class="block">
      <div class="p-4">
        <h3 class="font-semibold text-lg text-gray-800 mb-3 line-clamp-2 pr-12" :title="note.title">
          {{ note.title }}
        </h3>
        <div class="text-sm text-gray-500">
          {{ formatTime(note.createdAt) }}
        </div>
      </div>
    </RouterLink>

    <div
      class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 z-10">
      <RouterLink :to="{ name: 'EditNote', params: { id: note.id } }">
        <button
          class="p-1.5 rounded-full bg-white shadow-md hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          title="Edit note">
          <Icon icon="lucide:edit" class="h-4 w-4" />
        </button>
      </RouterLink>

      <button @click="handleDelete"
        class="p-1.5 rounded-full bg-white shadow-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200 cursor-pointer"
        title="Delete note">
        <Icon icon="lucide:trash-2" class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from "@/types/note";
import { formatTime } from "@/lib/utils";
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  delete: [note: Note]
}>()

const handleDelete = () => {
  emit('delete', props.note)
}
</script>