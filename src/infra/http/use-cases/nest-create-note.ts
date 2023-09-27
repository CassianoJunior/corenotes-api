import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { UsersRepository } from '@/domain/corenotes/application/repositories/users-repository'
import { CreateNoteUseCase } from '@/domain/corenotes/application/use-cases/create-note'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCreateNoteUseCase extends CreateNoteUseCase {
  constructor(
    notesRepository: NotesRepository,
    usersRepository: UsersRepository,
  ) {
    super(notesRepository, usersRepository)
  }
}
