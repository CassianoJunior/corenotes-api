import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract findUserById: (id: string) => Promise<User | null>
  abstract findUserByEmail: (email: string) => Promise<User | null>
  abstract create: (user: User) => Promise<void>
}
