import { UserNotExistError } from '@/domain/corenotes/application/use-cases/errors/user-not-exist-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'
import {
  CreateNoteRequestSchema,
  CreateNoteResponseSchema,
} from '../swagger/schemas/create-note'
import { NestCreateNoteUseCase } from '../use-cases/nest-create-note'

const createNoteBodySchema = z
  .object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
    color: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i),
    markedAsFavorite: z.boolean().default(false),
  })
  .strict()

type CreateNoteBodySchema = z.infer<typeof createNoteBodySchema>

@Controller('/note')
@ApiTags('note')
@ApiBearerAuth('jwt-auth')
export class CreateNoteController {
  constructor(private createNote: NestCreateNoteUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create a note' })
  @ApiBody({
    schema: CreateNoteRequestSchema.body,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Note created',
  })
  @ApiResponse({
    schema: CreateNoteResponseSchema['400'],
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    schema: CreateNoteResponseSchema['401'],
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    schema: CreateNoteResponseSchema['404'],
    status: HttpStatus.NOT_FOUND,
  })
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() body: CreateNoteBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content, color, markedAsFavorite } = body
    const userId = user.sub

    const result = await this.createNote.execute({
      title,
      content,
      color,
      markedAsFavorite,
      userId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotExistError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
