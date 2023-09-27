import { HashComparer } from '@/domain/corenotes/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/corenotes/application/cryptography/hash-generator'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashComparer, HashGenerator {
  private HASH_SALT_LENGTH = 10

  async compare(plain: string, hash: string) {
    return compare(plain, hash)
  }

  async hash(plain: string) {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
