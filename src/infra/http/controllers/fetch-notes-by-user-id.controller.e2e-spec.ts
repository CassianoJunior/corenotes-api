import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { NoteFactory } from 'test/factories/make-note'
import { UserFactory } from 'test/factories/make-user'

describe('Fetch User Notes (E2E)', () => {
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

  test('[GET] /notes', async () => {
    const user = await userFactory.makePrismaUser()

    await noteFactory.makePrismaNote({
      title: 'Note 1',
      userId: user.id,
    })
    await noteFactory.makePrismaNote({
      title: 'Note 2',
      userId: user.id,
    })
    await noteFactory.makePrismaNote({
      title: 'Note 3',
      userId: user.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .get(`/notes`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject({
      notes: expect.arrayContaining([
        expect.objectContaining({
          title: 'Note 1',
        }),
        expect.objectContaining({
          title: 'Note 2',
        }),
        expect.objectContaining({
          title: 'Note 3',
        }),
      ]),
    })
    expect(response.body.notes).toHaveLength(3)

    const notesOnDatabase = await prisma.note.findMany({
      where: {
        userId: user.id.toString(),
      },
    })

    expect(notesOnDatabase).toHaveLength(3)
  })
})
