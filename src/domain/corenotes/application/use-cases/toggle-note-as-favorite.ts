import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Note } from '../../enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'

interface ToggleNoteAsFavoriteUseCaseRequest {
  userId: string
  noteId: string
}

type ToggleNoteAsFavoriteUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    note: Note
  }
>

export class ToggleNoteAsFavoriteUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    userId,
    noteId,
  }: ToggleNoteAsFavoriteUseCaseRequest): Promise<ToggleNoteAsFavoriteUseCaseResponse> {
    const note = await this.notesRepository.findNoteById(noteId)

    if (!note) {
      return left(new ResourceNotFoundError())
    }

    if (note.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    note.markedAsFavorite = !note.markedAsFavorite

    await this.notesRepository.save(note)

    return right({
      note,
    })
  }
}
