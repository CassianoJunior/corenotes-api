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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  EditNoteRequestSchema,
  EditNoteResponseSchema,
} from '../swagger/schemas/update-note'
import { NestEditNoteUseCase } from '../use-cases/nest-edit-note'

const editNoteBodySchema = z
  .object({
    title: z.string(),
    content: z.string(),
    color: z.string().regex(/^#([0-9a-f]{3}){1,2}$/i),
  })
  .strict()

type EditNoteBodySchema = z.infer<typeof editNoteBodySchema>

@Controller('/note/:id')
@ApiTags('note')
@ApiBearerAuth('jwt-auth')
export class EditNoteController {
  constructor(private editNote: NestEditNoteUseCase) {}
  @Put()
  @ApiOperation({ summary: 'Edit a note' })
  @ApiBody({
    schema: EditNoteRequestSchema.body,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Note updated',
  })
  @ApiResponse({
    schema: EditNoteResponseSchema['400'],
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    schema: EditNoteResponseSchema['401'],
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiResponse({
    schema: EditNoteResponseSchema['403'],
    status: HttpStatus.FORBIDDEN,
  })
  @ApiResponse({
    schema: EditNoteResponseSchema['404'],
    status: HttpStatus.NOT_FOUND,
  })
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
