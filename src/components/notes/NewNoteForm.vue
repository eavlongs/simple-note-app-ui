<template>
  <Layout>
    <div class="max-w-4xl mx-auto p-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Create New Note</h2>

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

            <SubmitButton :disabled="isSubmitting || !title.trim()" :is-submitting="isSubmitting" text="Create Note"
              submitting-text="Creating..." />
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '../Layout.vue'
import { MAX_NOTE_CONTENT_LENGTH } from '@/lib/constants'
import NoteTitleInput from './NoteTitleInput.vue'
import NoteContentInput from './NoteContentInput.vue'
import CharacterCounter from './CharacterCounter.vue'
import ValidationError from '../general/ValidationError.vue'
import BackButton from '../general/BackButton.vue'
import SubmitButton from '../general/SubmitButton.vue'
import { apiWithAuth } from '@/lib/axios'
import { type ApiResponse } from '@/types/general'

const router = useRouter()

const title = ref('')
const content = ref('')

const titleError = ref('')
const contentError = ref('')

const isSubmitting = ref(false)
const error = ref('')
const success = ref('')

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
    const response = await apiWithAuth.post<ApiResponse>('/notes', {
      title: title.value,
      content: content.value,
    })

    success.value = 'Note created successfully!'
    router.push({ name: 'NoteApp' })
  } catch (err: any) {
    console.error('Error creating note:', err)

    if (err.response?.data?.error) {
      const errors = err.response.data.error

      const keys = Object.keys(errors)
      if (keys.length > 0) {
        error.value = errors[keys[0]][0]
      } else {
        error.value = err.response.data.message || 'Validation failed'
      }
    } else {
      error.value = err.response?.data?.message || err.message || 'Failed to create note. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}

const handleBack = () => {
  router.back()
}
</script>

<style scoped>
/* Additional custom styles if needed */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
