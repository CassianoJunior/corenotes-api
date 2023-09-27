import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Note } from '@/domain/corenotes/enterprise/entities/note'
import { Prisma, Note as PrismaNote } from '@prisma/client'

export class PrismaNoteMapper {
  static toDomain(raw: PrismaNote): Note {
    return Note.create(
      {
        title: raw.title,
        content: raw.content,
        markedAsFavorite: raw.markedAsFavorite,
        color: raw.color,
        userId: new UniqueEntityId(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(note: Note): Prisma.NoteUncheckedCreateInput {
    return {
      id: note.id.toString(),
      title: note.title,
      content: note.content,
      markedAsFavorite: note.markedAsFavorite,
      color: note.color,
      userId: note.userId.toString(),
    }
  }
}
