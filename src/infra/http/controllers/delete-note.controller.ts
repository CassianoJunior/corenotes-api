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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { DeleteNoteResponseSchema } from '../swagger/schemas/delete-note'
import { NestDeleteNoteUseCase } from '../use-cases/nest-delete-note'

@Controller('/note/:id')
@ApiTags('note')
@ApiBearerAuth('jwt-auth')
export class DeleteNoteController {
  constructor(private deleteNote: NestDeleteNoteUseCase) {}
  @Delete()
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Note deleted',
  })
  @ApiResponse({
    schema: DeleteNoteResponseSchema['401'],
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    schema: DeleteNoteResponseSchema['403'],
    status: HttpStatus.FORBIDDEN,
  })
  @ApiResponse({
    schema: DeleteNoteResponseSchema['404'],
    status: HttpStatus.NOT_FOUND,
  })
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
