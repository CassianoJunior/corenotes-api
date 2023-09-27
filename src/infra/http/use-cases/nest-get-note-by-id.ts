import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { GetNoteByIdUseCase } from '@/domain/corenotes/application/use-cases/get-note-by-id'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestGetNoteByIdUseCase extends GetNoteByIdUseCase {
  constructor(notesRepository: NotesRepository) {
    super(notesRepository)
  }
}
