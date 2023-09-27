import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { NotePresenter } from '../presenters/note-presenter'
import { NestFecthNotesByUserIdUseCase } from '../use-cases/nest-fetch-notes-by-user-id'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/notes')
export class FetchNotesController {
  constructor(private fetchNotes: NestFecthNotesByUserIdUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(
    @CurrentUser() user: UserPayload,
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const userId = user.sub

    const result = await this.fetchNotes.execute({
      userId,
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const notes = result.value.notes

    return { notes: notes.map(NotePresenter.toHTTP) }
  }
}
