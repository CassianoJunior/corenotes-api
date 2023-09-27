import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Note } from '../../enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'

interface GetNoteByIdUseCaseRequest {
  id: string
}

type GetNoteByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    note: Note
  }
>

export class GetNoteByIdUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    id,
  }: GetNoteByIdUseCaseRequest): Promise<GetNoteByIdUseCaseResponse> {
    const note = await this.notesRepository.findNoteById(id)

    if (!note) {
      return left(new ResourceNotFoundError())
    }

    return right({
      note,
    })
  }
}
