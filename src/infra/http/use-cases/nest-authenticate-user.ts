import { Encrypter } from '@/domain/corenotes/application/cryptography/encrypter'
import { HashComparer } from '@/domain/corenotes/application/cryptography/hash-comparer'
import { UsersRepository } from '@/domain/corenotes/application/repositories/users-repository'
import { AuthenticateUserUseCase } from '@/domain/corenotes/application/use-cases/authenticate-user'
import { Injectable } from '@nestjs/common'

@Injectable()
export class NestAuthenticateUserUseCase extends AuthenticateUserUseCase {
  constructor(
    usersRepository: UsersRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
  ) {
    super(usersRepository, hashComparer, encrypter)
  }
}
