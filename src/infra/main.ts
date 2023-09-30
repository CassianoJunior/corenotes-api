import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:3000'],
  })

  const configService = app.get(EnvService)

  const port = configService.get('PORT')

  await app.listen(port)
}

bootstrap()
