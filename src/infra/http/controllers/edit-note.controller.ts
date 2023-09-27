import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { NestEditNoteUseCase } from '../use-cases/nest-edit-note'

const editNoteBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  color: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i),
})

type EditNoteBodySchema = z.infer<typeof editNoteBodySchema>

@Controller('/note/:id')
export class EditNoteController {
  constructor(private editNote: NestEditNoteUseCase) {}
  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Body(new ZodValidationPipe(editNoteBodySchema)) body: EditNoteBodySchema,
    @Param('id') noteId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, color } = body
    const userId = user.sub

    const result = await this.editNote.execute({
      noteId,
      userId,
      title,
      content,
      color,
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
