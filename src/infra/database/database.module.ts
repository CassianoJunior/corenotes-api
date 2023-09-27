import { NotesRepository } from '@/domain/corenotes/application/repositories/notes-repository'
import { UsersRepository } from '@/domain/corenotes/application/repositories/users-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaNotesRepository } from './prisma/repositories/prisma-notes-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: NotesRepository,
      useClass: PrismaNotesRepository,
    },
  ],
  exports: [PrismaService, UsersRepository, NotesRepository],
})
export class DatabaseModule {}
