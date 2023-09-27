import { UserNotExistError } from '@/domain/corenotes/application/use-cases/errors/user-not-exist-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { NestCreateNoteUseCase } from '../use-cases/nest-create-note'

const createNoteBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  color: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i),
})

type CreateNoteBodySchema = z.infer<typeof createNoteBodySchema>

@Controller('/note')
export class CreateNoteController {
  constructor(private createNote: NestCreateNoteUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() body: CreateNoteBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, color } = body
    const userId = user.sub

    const result = await this.createNote.execute({
      title,
      content,
      color,
      userId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotExistError:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
