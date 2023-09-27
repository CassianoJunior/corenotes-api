import { PaginationParams } from '@/core/repositories/pagination-params'
import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { Note } from '@/domain/corenotes/enterprise/entities/note'
import { Injectable } from '@nestjs/common'
import { PrismaNoteMapper } from '../mappers/prisma-note-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotesRepository implements NotesRepository {
  constructor(private prisma: PrismaService) {}

  async findNoteById(id: string) {
    const note = await this.prisma.note.findUnique({
      where: {
        id,
      },
    })

    if (!note) {
      return null
    }

    return PrismaNoteMapper.toDomain(note)
  }

  async findManyNotesByUserId(
    userId: string,
    { page, perPage = 20 }: PaginationParams,
  ) {
    const notes = await this.prisma.note.findMany({
      where: {
        userId,
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return notes.map(PrismaNoteMapper.toDomain)
  }

  async create(note: Note) {
    await this.prisma.note.create({
      data: PrismaNoteMapper.toPrisma(note),
    })
  }

  async save(note: Note) {
    await this.prisma.note.update({
      where: {
        id: note.id.toString(),
      },
      data: PrismaNoteMapper.toPrisma(note),
    })
  }

  async deleteNote(note: Note) {
    await this.prisma.note.delete({
      where: {
        id: note.id.toString(),
      },
    })
  }
}
