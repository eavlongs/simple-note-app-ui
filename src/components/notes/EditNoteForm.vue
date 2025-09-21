<template>
  <Layout>
    <div class="max-w-4xl mx-auto p-4" v-if="note !== null">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Edit Note</h2>

        <form @submit.prevent="handleSubmit">

          <div class="space-y-4">
            <NoteTitleInput v-model="title" :error="titleError" />

            <NoteContentInput v-model="content" :error="contentError" />
          </div>

          <CharacterCounter :value="content" :max-length="MAX_NOTE_CONTENT_LENGTH" />

          <ValidationError :error="error" />

          <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {{ success }}
          </div>

          <div class="flex justify-center gap-3">
            <BackButton />

            <SubmitButton :disabled="isSubmitting || !title.trim()" :is-submitting="isSubmitting" text="Save changes"
              submitting-text="Saving..." />
          </div>
        </form>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 mt-40">
      Note not found
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '../Layout.vue'
import { MAX_NOTE_CONTENT_LENGTH } from '@/lib/constants'
import NoteTitleInput from './NoteTitleInput.vue'
import NoteContentInput from './NoteContentInput.vue'
import CharacterCounter from './CharacterCounter.vue'
import ValidationError from '../general/ValidationError.vue'
import BackButton from '../general/BackButton.vue'
import SubmitButton from '../general/SubmitButton.vue'
import { apiWithAuth } from '@/lib/axios'
import type { ApiResponse } from '@/types/general'
import type { GetNoteResponse, Note } from '@/types/note'

const router = useRouter()
const route = useRoute()

const id = route.params.id as string

const title = ref('')
const content = ref('')

const titleError = ref('')
const contentError = ref('')

const isSubmitting = ref(false)
const error = ref('')
const success = ref('')

const note = ref<Note | null>(null)

watch(note, (newNote) => {
  if (newNote) {
    title.value = newNote.title
    content.value = newNote.content || ''
  }
})

const validateForm = (): boolean => {
  titleError.value = ''
  contentError.value = ''
  error.value = ''

  let isValid = true

  if (!title.value.trim()) {
    titleError.value = 'Title is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await apiWithAuth.put<ApiResponse>(`/notes/${id}`, {
      title: title.value,
      content: content.value,
    })

    success.value = 'Note updated successfully!'
    router.push({ name: 'NoteApp' })
  } catch (err: any) {
    console.error('Error updaing note:', err)

    if (err.response?.data?.error) {
      const errors = err.response.data.error

      const keys = Object.keys(errors)
      if (keys.length > 0) {
        error.value = errors[keys[0]][0]
      } else {
        error.value = err.response.data.message || 'Validation failed'
      }
    } else {
      error.value = err.response?.data?.message || err.message || 'Failed to edit note. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
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
  }
}

onMounted(() => {
  fetchNote()
})
</script>
