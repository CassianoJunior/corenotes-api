import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeNote } from 'test/factories/make-note'
import { InMemoryNotesRepository } from 'test/repositories/in-memory-notes-repository'
import { ToggleNoteAsFavoriteUseCase } from './toggle-note-as-favorite'

let inMemoryNotesRepository: InMemoryNotesRepository
let sut: ToggleNoteAsFavoriteUseCase

describe('Mark Note as Favorite Use Case', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository()
    sut = new ToggleNoteAsFavoriteUseCase(inMemoryNotesRepository)
  })

  it('should be able to toggle note as favorite', async () => {
    const note = makeNote({
      markedAsFavorite: false,
    })

    inMemoryNotesRepository.items.push(note)

    const resultMark = await sut.execute({
      noteId: note.id.toString(),
      userId: note.userId.toString(),
    })

    expect(resultMark.isRight()).toBe(true)
    expect(inMemoryNotesRepository.items[0]).toMatchObject({
      markedAsFavorite: true,
    })

    const resultUnmark = await sut.execute({
      noteId: note.id.toString(),
      userId: note.userId.toString(),
    })

    expect(resultUnmark.isRight()).toBe(true)
    expect(inMemoryNotesRepository.items[0]).toMatchObject({
      markedAsFavorite: false,
    })
  })

  it('should not be able to mark a non existent note as favorite', async () => {
    const note = makeNote()

    const result = await sut.execute({
      noteId: 'non-existing-note-id',
      userId: note.userId.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to mark note as favorite from another user', async () => {
    const note = makeNote({
      userId: new UniqueEntityId('1'),
    })

    inMemoryNotesRepository.items.push(note)

    const result = await sut.execute({
      noteId: note.id.toString(),
      userId: '1123',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
