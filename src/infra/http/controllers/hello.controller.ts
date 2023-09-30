import { Public } from '@/infra/auth/public'
import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('/')
@Public()
export class HelloController {
  @Get()
  @ApiOperation({ summary: 'Return greetings' })
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Welcome to CoreNotes API!',
        },
        tip: {
          type: 'string',
          example: 'Use /docs to access the API documentation 📑',
        },
      },
    },
    status: HttpStatus.OK,
  })
  async handle() {
    return {
      message: 'Welcome to CoreNotes API!',
      tip: 'Use /docs to access the API documentation 📑',
    }
  }
}
