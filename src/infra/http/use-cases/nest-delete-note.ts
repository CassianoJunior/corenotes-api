import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { DeleteNoteUseCase } from '@/domain/corenotes/application/use-cases/delete-note'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestDeleteNoteUseCase extends DeleteNoteUseCase {
  constructor(notesRepository: NotesRepository) {
    super(notesRepository)
  }
}
