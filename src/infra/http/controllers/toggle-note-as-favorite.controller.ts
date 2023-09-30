import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { NotePresenter } from '../presenters/note-presenter'
import { NestToggleNoteAsFavoriteUseCase } from '../use-cases/nest-toggle-note-as-favorite'

@Controller('/note/:id')
@ApiTags('note')
@ApiBearerAuth('jwt-auth')
export class ToggleNoteAsFavoriteController {
  constructor(private toggleNoteAsFavorite: NestToggleNoteAsFavoriteUseCase) {}

  @Patch()
  @ApiOperation({ summary: 'Toggle note as favorite' })
  @HttpCode(HttpStatus.OK)
  async handle(@CurrentUser() user: UserPayload, @Param('id') noteId: string) {
    const userId = user.sub

    const result = await this.toggleNoteAsFavorite.execute({
      userId,
      noteId,
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

    const { note } = result.value

    return { note: NotePresenter.toHTTP(note) }
  }
}
