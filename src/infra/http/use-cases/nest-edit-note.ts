import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { EditNoteUseCase } from '@/domain/corenotes/application/use-cases/edit-note'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestEditNoteUseCase extends EditNoteUseCase {
  constructor(notesRepository: NotesRepository) {
    super(notesRepository)
  }
}
