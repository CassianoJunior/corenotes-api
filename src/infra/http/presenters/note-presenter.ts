import { Note } from '@/domain/corenotes/enterprise/entities/note'

export class NotePresenter {
  static toHTTP(note: Note) {
    return {
      id: note.id.toString(),
      title: note.title,
      content: note.content,
      color: note.color,
      markedAsFavorite: note.markedAsFavorite,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    }
  }
}
