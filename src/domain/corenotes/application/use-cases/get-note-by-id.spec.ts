import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeNote } from 'test/factories/make-note'
import { InMemoryNotesRepository } from 'test/repositories/in-memory-notes-repository'
import { GetNoteByIdUseCase } from './get-note-by-id'

let inMemoryNotesRepository: InMemoryNotesRepository
let sut: GetNoteByIdUseCase

describe('Get Note by Id Use Case', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository()
    sut = new GetNoteByIdUseCase(inMemoryNotesRepository)
  })

  it('should be able to get a note by id', async () => {
    const note = makeNote({}, new UniqueEntityId('1'))

    inMemoryNotesRepository.create(note)

    const result = await sut.execute({
      id: note.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      note: inMemoryNotesRepository.items[0],
    })
  })

  it('should not be able to get a note by non existent id', async () => {
    const note = makeNote()

    inMemoryNotesRepository.create(note)

    const result = await sut.execute({
      id: 'non-existent-note-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
