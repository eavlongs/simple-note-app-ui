<template>
  <div v-if="note !== null" class="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg border border-gray-400 shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Delete Note</h3>
        </div>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete the note titled "{{ note?.title }}"?
        </p>
        <div class="flex justify-end space-x-3">
          <button @click="emits('close')"
            class="px-4 py-2 hover:text-gray-800 border border-gray-500 hover:bg-gray-100 rounded-lg">
            Cancel
          </button>
          <button @click="confirmDelete" :disabled="deleting"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
            {{ deleting ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { apiWithAuth } from '@/lib/axios';
import type { Note } from '@/types/note';
import { ref } from 'vue';

const props = defineProps<{ note: Note | null }>()
const emits = defineEmits(['close', 'deleted'])
const deleting = ref(false)

const confirmDelete = async () => {
  try {
    deleting.value = true

    const response = await apiWithAuth.delete(`/notes/${props.note!.id}`)

    if (response.data.success) {
      emits('deleted')
    } else {
      alert(response.data.message || 'Failed to delete note')
    }
  } catch (err: any) {
    console.error('Error deleting note:', err)
    alert(err.response?.data?.message || 'Failed to delete note')
  } finally {
    deleting.value = false
    emits('close')
  }
}
</script>