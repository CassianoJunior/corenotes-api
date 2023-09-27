import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotesRepository } from '../repositories/notes-repository'

interface DeleteNoteUseCaseRequest {
  userId: string
  noteId: string
}

type DeleteNoteUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteNoteUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    noteId,
    userId,
  }: DeleteNoteUseCaseRequest): Promise<DeleteNoteUseCaseResponse> {
    const note = await this.notesRepository.findNoteById(noteId)

    if (!note) {
      return left(new ResourceNotFoundError())
    }

    if (note.userId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    await this.notesRepository.deleteNote(note)

    return right(null)
  }
}
