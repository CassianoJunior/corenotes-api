import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

describe('Authenticate (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[POST] /auth success', async () => {
    await userFactory.makePrismaUser({
      email: 'johndoe@example.com',
      password: await hash('123456', 10),
    })

    const response = await request(app.getHttpServer()).post('/auth').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })

  test('[POST] /auth wrong credentials', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({
      message: 'Credentials are not valid.',
      error: 'Unauthorized',
      statusCode: 401,
    })
  })

  test('[POST] /auth missing fields', async () => {
    const response = await request(app.getHttpServer()).post('/auth').send({
      email: 'johndoe@example.com',
    })

    expect(response.statusCode).toBe(400)
    expect(response.body).toHaveProperty('errors')
  })
})
