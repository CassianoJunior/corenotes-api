import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'
import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['http://localhost:3000'],
  })

  const config = new DocumentBuilder()
    .setTitle('CoreNotes API')
    .setDescription('API for CoreNotes application')
    .setExternalDoc('Json export', '/docs-json')
    .setVersion('0.1')
    .addTag('auth')
    .addTag('note')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter Json Web Token',
        in: 'header',
      },
      'jwt-auth',
    )
    .build()

  const document = SwaggerModule.createDocument(app, config)
  const theme = new SwaggerTheme('v3')
  const options = {
    customCss: theme.getBuffer('dark'),
  }

  SwaggerModule.setup('docs', app, document, options)

  const configService = app.get(EnvService)
  const port = configService.get('PORT')

  await app.listen(port)
}

bootstrap()
