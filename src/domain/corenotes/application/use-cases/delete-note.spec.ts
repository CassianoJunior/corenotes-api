import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeNote } from 'test/factories/make-note'
import { InMemoryNotesRepository } from 'test/repositories/in-memory-notes-repository'
import { expect } from 'vitest'
import { DeleteNoteUseCase } from './delete-note'

let inMemoryNotesRepository: InMemoryNotesRepository
let sut: DeleteNoteUseCase

describe('Delete Note Use Case', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository()
    sut = new DeleteNoteUseCase(inMemoryNotesRepository)
  })

  it('should be able to delete a note', async () => {
    const note = makeNote()

    inMemoryNotesRepository.items.push(note)

    const result = await sut.execute({
      noteId: note.id.toString(),
      userId: note.userId.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotesRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non existent note', async () => {
    const note = makeNote()

    const result = await sut.execute({
      noteId: 'non-existing-note-id',
      userId: note.userId.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a note from another user', async () => {
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
