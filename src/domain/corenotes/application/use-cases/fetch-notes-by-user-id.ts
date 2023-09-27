import { Either, right } from '@/core/either'
import { Note } from '../../enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'

interface FecthNotesByUserIdUseCaseRequest {
  userId: string
  page: number
}

type FecthNotesByUserIdUseCaseResponse = Either<
  null,
  {
    notes: Note[]
  }
>

export class FecthNotesByUserIdUseCase {
  constructor(private notesRepository: NotesRepository) {}

  async execute({
    userId,
    page,
  }: FecthNotesByUserIdUseCaseRequest): Promise<FecthNotesByUserIdUseCaseResponse> {
    const notes = await this.notesRepository.findManyNotesByUserId(userId, {
      page,
    })

    return right({
      notes,
    })
  }
}
