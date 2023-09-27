import { HashGenerator } from '@/domain/corenotes/application/cryptography/hash-generator'
import { UsersRepository } from '@/domain/corenotes/application/repositories/users-repository'
import { RegisterUserUseCase } from '@/domain/corenotes/application/use-cases/register-user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestRegisterUserUseCase extends RegisterUserUseCase {
  constructor(usersRepository: UsersRepository, hashGenerator: HashGenerator) {
    super(usersRepository, hashGenerator)
  }
}
