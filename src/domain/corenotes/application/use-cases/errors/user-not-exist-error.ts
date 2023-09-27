import { UseCaseError } from '@/core/errors/use-case-error'

export class UserNotExistError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" not exist.`)
  }
}
