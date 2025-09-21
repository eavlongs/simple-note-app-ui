<template>
  <Layout>
    <div>
      <div v-if="loading" class="flex items-center justify-center min-h-screen">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading note...</p>
        </div>
      </div>

      <div v-else-if="error" class="flex items-center justify-center mt-40">
        <div class="text-center max-w-md mx-auto px-4">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Note Not Found</h2>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <button @click="goBack"
            class="inline-flex items-center px-2 py-1 lg:px-4 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Icon icon="lucide:arrow-left" class="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>

      <div v-else-if="note" class="max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-3 py-2 lg:px-6 lg:py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <button @click="goBack"
                class="inline-flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Icon icon="lucide:arrow-left" class="h-4 w-4 mr-2" />
                Back
              </button>

              <div class="flex items-center gap-2">
                <RouterLink :to="{ name: 'EditNote', params: { id: note.id } }">
                  <button @click="handleEdit"
                    class="inline-flex items-center px-2 py-1 lg:px-4 lg:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    <Icon icon="lucide:edit" class="h-4 w-4 mr-2" />
                    Edit
                  </button>
                </RouterLink>

                <button @click="handleDelete" :disabled="deleting"
                  class="inline-flex items-center px-2 py-1 lg:px-4 lg:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
                  <Icon :icon="deleting ? 'lucide:loader-2' : 'lucide:trash-2'"
                    :class="['h-4 w-4 mr-2', { 'animate-spin': deleting }]" />
                  {{ deleting ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 border-b border-gray-200">
            <h1 class="text-2xl font-bold text-gray-900 mb-3">{{ note.title }}</h1>
            <div class="flex lg:items-center flex-col lg:flex-row gap-y-1 text-sm text-gray-500 space-x-4">
              <div class="flex items-center">
                <Icon icon="lucide:calendar" class="h-4 w-4 mr-1" />
                Created: {{ formatTime(note.createdAt) }}
              </div>
              <div v-if="note.updatedAt !== note.createdAt" class="flex items-center">
                <Icon icon="lucide:clock" class="h-4 w-4 mr-1" />
                Updated: {{ formatTime(note.updatedAt) }}
              </div>
            </div>
          </div>

          <div class="px-6 py-6">
            <div class="prose prose-gray max-w-none whitespace-pre-wrap" v-if="note.content && note.content.trim()">
              {{ note.content }}
            </div>
            <div v-else class="text-gray-500 italic">
              This note is empty.
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteNoteDialog :note="noteToDelete" @close="noteToDelete = null" @deleted="goBack" />
  </Layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import type { Note } from '../../types/note'
import { formatTime } from '../../lib/utils'
import Layout from '../Layout.vue'
import { apiWithAuth } from '@/lib/axios'
import type { GetNoteResponse } from '@/types/note'
import DeleteNoteDialog from './DeleteNoteDialog.vue'

const route = useRoute()
const router = useRouter()

const note = ref<Note | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const deleting = ref(false)
const noteToDelete = ref<Note | null>(null)

const id = route.params.id as string

watch(note, (newNote) => {
  if (newNote) {
    note.value = newNote
  }
})

const goBack = () => {
  router.back()
}

async function fetchNote() {
  try {
    const response = await apiWithAuth.get<GetNoteResponse>(`/notes/${id}`, {
    })

    if (response.data.success && response.data.data) {
      note.value = response.data.data.note
    }
  } catch (e: any) {
    console.error(e)
    error.value = e.message || 'Failed to fetch note. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
  router.push(`/notes/${id}/edit`)
}

const handleDelete = () => {
  noteToDelete.value = note.value
}

onMounted(() => {
  fetchNote()
})
</script>
