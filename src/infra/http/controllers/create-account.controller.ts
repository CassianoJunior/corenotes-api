import { UserAlreadyExistsError } from '@/domain/corenotes/application/use-cases/errors/user-already-exists-error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import {
  CreateUserRequestSchema,
  CreateUserResponseSchema,
} from '../swagger/schemas/create-user'
import { NestRegisterUserUseCase } from '../use-cases/nest-register-user'

const createAccountBodySchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })
  .strict()

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
@ApiTags('auth')
@Public()
export class CreateAccountController {
  constructor(private registerUser: NestRegisterUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create account' })
  @ApiBody({
    schema: CreateUserRequestSchema.body,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Account created',
  })
  @ApiResponse({
    schema: CreateUserResponseSchema['400'],
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    schema: CreateUserResponseSchema['409'],
    status: HttpStatus.CONFLICT,
  })
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
