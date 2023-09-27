import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeNote } from 'test/factories/make-note'
import { makeUser } from 'test/factories/make-user'
import { InMemoryNotesRepository } from 'test/repositories/in-memory-notes-repository'
import { InMemoryUsersRepository } from '../../../../../test/repositories/in-memory-users-repository'
import { CreateNoteUseCase } from './create-note'
import { UserNotExistError } from './errors/user-not-exist-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryNotesRepository: InMemoryNotesRepository
let sut: CreateNoteUseCase

describe('Create Note Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryNotesRepository = new InMemoryNotesRepository()
    sut = new CreateNoteUseCase(
      inMemoryNotesRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to create a note', async () => {
    const user = makeUser()

    inMemoryUsersRepository.create(user)

    const note = makeNote({
      userId: user.id,
    })

    const result = await sut.execute({
      userId: note.userId.toString(),
      title: note.title,
      content: note.content,
      color: note.color,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      note: inMemoryNotesRepository.items[0],
    })
  })

  it('should not be able to create a note for a non existent user', async () => {
    const note = makeNote({
      userId: new UniqueEntityId('non-existent-user-id'),
    })

    const result = await sut.execute({
      userId: note.userId.toString(),
      title: note.title,
      content: note.content,
      color: note.color,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotExistError)
  })
})
