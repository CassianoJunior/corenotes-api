import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { NestDeleteNoteUseCase } from '../use-cases/nest-delete-note'

@Controller('/note/:id')
export class DeleteNoteController {
  constructor(private deleteNote: NestDeleteNoteUseCase) {}
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@CurrentUser() user: UserPayload, @Param('id') noteId: string) {
    const userId = user.sub

    const result = await this.deleteNote.execute({
      noteId,
      userId,
    })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(result.value.message)
        case NotAllowedError:
          throw new ForbiddenException(result.value.message)
        default:
          throw new BadRequestException(result.value.message)
      }
    }
  }
}
