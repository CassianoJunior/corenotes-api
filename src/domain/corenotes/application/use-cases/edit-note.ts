import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Note } from '../../enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'

interface EditNoteUseCaseRequest {
  userId: string
  noteId: string
  title: string
  content: string
  color: string
}

type EditNoteUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    note: Note
  }
>

export class EditNoteUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    userId,
    noteId,
    title,
    content,
    color,
  }: EditNoteUseCaseRequest): Promise<EditNoteUseCaseResponse> {
    const note = await this.notesRepository.findNoteById(noteId)

    if (!note) {
      return left(new ResourceNotFoundError())
    }

    if (note.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    note.title = title
    note.content = content
    note.color = color

    await this.notesRepository.save(note)

    return right({
      note,
    })
  }
}
