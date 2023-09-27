import { PaginationParams } from '@/core/repositories/pagination-params'
import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { Note } from '@/domain/corenotes/enterprise/entities/note'

export class InMemoryNotesRepository implements NotesRepository {
  public items: Note[] = []

  async findNoteById(id: string) {
    const note = this.items.find((note) => note.id.toString() === id)

    return note || null
  }

  async findManyNotesByUserId(
    userId: string,
    { page, perPage = 20 }: PaginationParams,
  ) {
    const notes = this.items
      .filter((note) => note.userId.toString() === userId)
      .slice((page - 1) * perPage, page * perPage)

    return notes
  }

  async create(note: Note) {
    this.items.push(note)
  }

  async save(note: Note) {
    const intemIndex = this.items.findIndex((item) => item.id === note.id)

    this.items[intemIndex] = note
  }

  async deleteNote(note: Note) {
    this.items = this.items.filter((item) => item.id !== note.id)
  }
}
