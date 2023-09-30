import { WrongCredentialsError } from '@/domain/corenotes/application/use-cases/errors/wrong-credentials-error'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'
import {
  AuthenticateRequestSchema,
  AuthenticateResponseSchema,
} from '../swagger/schemas/authenticate'
import { NestAuthenticateUserUseCase } from '../use-cases/nest-authenticate-user'

const authenticateBodySchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict()

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/auth')
@ApiTags('auth')
@Public()
export class AuthenticateController {
  constructor(private authenticateUser: NestAuthenticateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiBody({
    schema: AuthenticateRequestSchema.body,
  })
  @ApiResponse({
    schema: AuthenticateResponseSchema[200],
    status: HttpStatus.OK,
  })
  @ApiResponse({
    schema: AuthenticateResponseSchema[400],
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    schema: AuthenticateResponseSchema[401],
    status: HttpStatus.UNAUTHORIZED,
  })
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUser.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
