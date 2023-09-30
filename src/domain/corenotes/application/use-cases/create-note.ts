import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Note } from '../../enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'
import { UsersRepository } from '../repositories/users-repository'
import { UserNotExistError } from './errors/user-not-exist-error'

interface CreateNoteUseCaseRequest {
  userId: string
  title: string
  content: string
  color: string
  markedAsFavorite?: boolean
}

type CreateNoteUseCaseResponse = Either<
  UserNotExistError,
  {
    note: Note
  }
>

export class CreateNoteUseCase {
  constructor(
    private notesRepository: NotesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    title,
    content,
    color,
    markedAsFavorite,
  }: CreateNoteUseCaseRequest): Promise<CreateNoteUseCaseResponse> {
    const userExists = await this.usersRepository.findUserById(userId)

    if (!userExists) {
      return left(new UserNotExistError(userId))
    }

    const note = Note.create({
      userId: new UniqueEntityId(userId),
      title,
      content,
      color,
      markedAsFavorite,
    })

    await this.notesRepository.create(note)

    return right({
      note,
    })
  }
}
