import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    password,
    email,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userExists = await this.usersRepository.findUserByEmail(email)

    if (userExists) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
