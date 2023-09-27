import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Note, NoteProps } from '@/domain/corenotes/enterprise/entities/note'
import { PrismaNoteMapper } from '@/infra/database/prisma/mappers/prisma-note-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeNote(
  override: Partial<NoteProps> = {},
  id?: UniqueEntityId,
) {
  const note = Note.create(
    {
      userId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      color: faker.internet.color(),
      ...override,
    },
    id,
  )

  return note
}

@Injectable()
export class NoteFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNote(data: Partial<NoteProps> = {}): Promise<Note> {
    const note = makeNote(data)

    await this.prisma.note.create({
      data: PrismaNoteMapper.toPrisma(note),
    })

    return note
  }
}
