import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { NoteFactory } from 'test/factories/make-note'
import { UserFactory } from 'test/factories/make-user'

describe('Delete Note (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let userFactory: UserFactory
  let noteFactory: NoteFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, NoteFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    noteFactory = moduleRef.get(NoteFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /note/:id', async () => {
    const user = await userFactory.makePrismaUser()
    const note = await noteFactory.makePrismaNote({
      userId: user.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .delete(`/note/${note.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)

    const noteOnDatabase = await prisma.note.findUnique({
      where: {
        id: note.id.toString(),
      },
    })

    expect(noteOnDatabase).toBeNull()
  })
})
