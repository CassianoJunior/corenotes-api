import { Controller, Get } from '@nestjs/common'

@Controller('/hello')
export class HelloController {
  @Get()
  async handle() {
    return { message: 'Hello World' }
  }
}
