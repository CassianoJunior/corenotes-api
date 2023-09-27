import { UsersRepository } from '@/domain/corenotes/application/repositories/users-repository'
import { User } from '@/domain/corenotes/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findUserById(id: string) {
    const user = this.items.find((user) => user.id.toString() === id)

    return user || null
  }

  async findUserByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    return user || null
  }

  async create(user: User) {
    this.items.push(user)
  }
}
