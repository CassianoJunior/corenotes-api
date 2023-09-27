import { HashComparer } from '@/domain/corenotes/application/criptography/hash-comparer'
import { HashGenerator } from '@/domain/corenotes/application/criptography/hash-generator'

export class FakeHasher implements HashComparer, HashGenerator {
  async compare(plain: string, hash: string) {
    return plain.concat('-hashed') === hash
  }

  async hash(plain: string) {
    return plain.concat('-hashed')
  }
}
