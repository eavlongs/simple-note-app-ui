import type { ApiResponse } from './general'

export type Note = {
  id: number
  title: string
  content: string | null
  createdAt: string
  updatedAt: string
  userId: number
}

export type GetNotesResponse = ApiResponse<{ notes: Note[] }>
export type GetNoteResponse = ApiResponse<{ note: Note }>
