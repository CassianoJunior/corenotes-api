import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { ToggleNoteAsFavoriteUseCase } from '@/domain/corenotes/application/use-cases/toggle-note-as-favorite'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestToggleNoteAsFavoriteUseCase extends ToggleNoteAsFavoriteUseCase {
  constructor(notesRepository: NotesRepository) {
    super(notesRepository)
  }
}
