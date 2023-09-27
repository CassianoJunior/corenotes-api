import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { FecthNotesByUserIdUseCase } from '@/domain/corenotes/application/use-cases/fetch-notes-by-user-id'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestFecthNotesByUserIdUseCase extends FecthNotesByUserIdUseCase {
  constructor(notesRepository: NotesRepository) {
    super(notesRepository)
  }
}
