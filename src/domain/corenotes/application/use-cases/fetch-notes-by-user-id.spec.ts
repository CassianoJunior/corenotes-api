import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeNote } from 'test/factories/make-note'
import { InMemoryNotesRepository } from 'test/repositories/in-memory-notes-repository'
import { FecthNotesByUserIdUseCase } from './fetch-notes-by-user-id'

let inMemoryNotesRepository: InMemoryNotesRepository
let sut: FecthNotesByUserIdUseCase

describe('Fetch Notes by User Id Use Case', () => {
  beforeEach(() => {
    inMemoryNotesRepository = new InMemoryNotesRepository()
    sut = new FecthNotesByUserIdUseCase(inMemoryNotesRepository)
  })

  it('should be able to fetch user notes', async () => {
    inMemoryNotesRepository.items.push(
      makeNote({
        title: 'Note 1',
        userId: new UniqueEntityId('1'),
      }),
      makeNote({
        title: 'Note 2',
        userId: new UniqueEntityId('1'),
      }),
      makeNote({
        title: 'Note 3',
        userId: new UniqueEntityId('1'),
      }),
    )

    const result = await sut.execute({
      userId: '1',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.notes).toHaveLength(3)
    expect(result.value?.notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Note 1',
          userId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          title: 'Note 2',
          userId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          title: 'Note 3',
          userId: new UniqueEntityId('1'),
        }),
      ]),
    )
  })

  it('should be able to fetch user notes paginated', async () => {
    for (let i = 0; i < 22; i++) {
      inMemoryNotesRepository.items.push(
        makeNote({
          userId: new UniqueEntityId('1'),
        }),
      )
    }

    const result = await sut.execute({
      userId: '1',
      page: 2,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.notes).toHaveLength(2)
  })
})
