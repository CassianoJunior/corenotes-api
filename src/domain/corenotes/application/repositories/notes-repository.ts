import { PaginationParams } from '@/core/repositories/pagination-params'
import { Note } from '../../enterprise/entities/note'

export abstract class NotesRepository {
  abstract findNoteById: (id: string) => Promise<Note | null>
  abstract findManyNotesByUserId: (
    userId: string,
    { page }: PaginationParams,
  ) => Promise<Note[]>

  abstract create: (note: Note) => Promise<void>
  abstract save: (note: Note) => Promise<void>
  abstract deleteNote: (note: Note) => Promise<void>
}
