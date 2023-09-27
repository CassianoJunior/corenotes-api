import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeNote } from 'test/factories/make-note'
import { makeUser } from 'test/factories/make-user'
import { InMemoryNotesRepository } from 'test/repositories/in-memory-notes-repository'
import { InMemoryUsersRepository } from '../../../../../test/repositories/in-memory-users-repository'
import { UniqueEntityId } from './../../../../core/entities/unique-entity-id'
import { EditNoteUseCase } from './edit-note'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryNotesRepository: InMemoryNotesRepository
let sut: EditNoteUseCase

describe('Edit Note Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryNotesRepository = new InMemoryNotesRepository()
    sut = new EditNoteUseCase(inMemoryNotesRepository)
  })

  it('should be able to edit an note', async () => {
    const user = makeUser()

    inMemoryUsersRepository.create(user)

    const note = makeNote({
      userId: user.id,
    })

    inMemoryNotesRepository.create(note)

    const result = await sut.execute({
      userId: note.userId.toString(),
      noteId: note.id.toString(),
      title: 'new title',
      content: 'new content',
      color: 'new color',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      note: inMemoryNotesRepository.items[0],
    })
  })

  it('should not be able to edit an note that does not exist', async () => {
    const result = await sut.execute({
      userId: '1',
      noteId: 'non-existing-note-id',
      title: 'new title',
      content: 'new content',
      color: 'new color',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to edit an note from another user', async () => {
    const user = makeUser({}, new UniqueEntityId('another-user-id'))

    inMemoryUsersRepository.create(user)

    const note = makeNote({
      userId: user.id,
    })

    inMemoryNotesRepository.create(note)

    const result = await sut.execute({
      userId: '1',
      noteId: note.id.toString(),
      title: 'new title',
      content: 'new content',
      color: 'new color',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
