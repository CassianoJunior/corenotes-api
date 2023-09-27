import { FakeHasher } from 'test/criptography/fake-hasher'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from '../../../../../test/repositories/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUserUseCase } from './register-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register a new user', async () => {
    const user = makeUser({
      password: '123456',
    })

    const result = await sut.execute(user)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should be able to hash student password upon registration', async () => {
    const user = makeUser({
      password: '123456',
    })

    const result = await sut.execute(user)

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register an user with same email twice', async () => {
    const user = makeUser({
      email: 'johndoe@mail.com',
    })

    inMemoryUsersRepository.create(user)

    const result = await sut.execute(user)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
