<template>
  <Layout>
    <div class="p-4 space-y-6">
      <div class="flex gap-4 lg:items-center flex-col lg:flex-row">
        <SearchInput @search="handleSearch" />
        <Sort @sort="handleSortChange" />
        <DateFilter @date-filter="handleDateFilter" />
        <div class="md:ml-auto">
          <NewNoteButton />
        </div>
      </div>

      <div v-if="notes.length === 0" class="text-center text-gray-500 mt-40">
        No notes found
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <NoteCard v-for="note in notes" :key="note.id" :note="note" @delete="noteToDelete = note" />
      </div>
    </div>

    <DeleteNoteDialog :note="noteToDelete" @close="noteToDelete = null" @deleted="fetchNotes" />
  </Layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Layout from '../Layout.vue'
import SearchInput from '../general/SearchInput.vue'
import Sort, { type SortConfig } from '../general/Sort.vue'
import type { GetNotesResponse, Note } from '@/types/note'
import NoteCard from './NoteCard.vue'
import DateFilter, { type DateFilterConfig } from '../general/DateFilter.vue'
import NewNoteButton from '../notes/NewNoteButton.vue'
import { apiWithAuth } from '@/lib/axios'
import DeleteNoteDialog from './DeleteNoteDialog.vue'

const notes = ref<Note[]>([])
const filteredNotes = ref<Note[]>([])
const noteToDelete = ref<Note | null>(null)

const handleSearch = (term: string) => {
  if (term.trim() === '') {
    filteredNotes.value = notes.value
    return
  }

  filteredNotes.value = notes.value.filter(note =>
    note.title.toLowerCase().includes(term.toLowerCase())
  )
}

const handleSortChange = (config: SortConfig) => {
  const field = config.field

  notes.value = notes.value.sort((a, b) => {
    const aValue = a[config.field]
    const bValue = b[config.field]

    if (field === 'title') {
      if (config.order === 'asc') {
        return aValue < bValue ? -1 : 1
      }
      return aValue < bValue ? 1 : -1
    }
    // sort date fields
    const dateA = new Date(aValue)
    const dateB = new Date(bValue)

    if (config.order === 'asc') {
      return dateA < dateB ? -1 : 1
    }
    return dateA < dateB ? 1 : -1
  })
}

const handleDateFilter = (config: DateFilterConfig) => {
  if (config.days === undefined) return

  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - config.days)

  filteredNotes.value = notes.value.filter(note => {
    const date = new Date(note.createdAt)

    return date.getTime() > currentDate.getTime()
  })
}

async function fetchNotes() {
  try {
    const response = await apiWithAuth.get<GetNotesResponse>('/notes', {
      // don't suppport backend filter and sort yet
      // params: {
      //   searchTerm: searchTerm.value,
      //   sortConfig: currentSortConfig.value,
      //   dateFilterConfig: currentDateFilterConfig.value,
      // },
    })

    if (response.data.success && response.data.data) {
      notes.value = response.data.data.notes
    }
  } catch (e: any) {
    console.error(e)
  }
}

onMounted(() => {
  fetchNotes()
})
</script>
