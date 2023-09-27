import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/autheticate-user.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateNoteController } from './controllers/create-note.controller'
import { DeleteNoteController } from './controllers/delete-note.controller'
import { EditNoteController } from './controllers/edit-note.controller'
import { FetchNotesController } from './controllers/fetch-notes-by-user-id.controller'
import { HelloController } from './controllers/hello.controller'
import { ToggleNoteAsFavoriteController } from './controllers/toggle-note-as-favorite.controller'
import { CryptographyModule } from './cryptography/cryptography.module'
import { NestAuthenticateUserUseCase } from './use-cases/nest-authenticate-user'
import { NestCreateNoteUseCase } from './use-cases/nest-create-note'
import { NestDeleteNoteUseCase } from './use-cases/nest-delete-note'
import { NestEditNoteUseCase } from './use-cases/nest-edit-note'
import { NestFecthNotesByUserIdUseCase } from './use-cases/nest-fetch-notes-by-user-id'
import { NestRegisterUserUseCase } from './use-cases/nest-register-user'
import { NestToggleNoteAsFavoriteUseCase } from './use-cases/nest-toggle-note-as-favorite'

@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [
    HelloController,
    AuthenticateController,
    CreateAccountController,
    CreateNoteController,
    DeleteNoteController,
    EditNoteController,
    FetchNotesController,
    ToggleNoteAsFavoriteController,
  ],
  providers: [
    NestAuthenticateUserUseCase,
    NestRegisterUserUseCase,
    NestCreateNoteUseCase,
    NestDeleteNoteUseCase,
    NestEditNoteUseCase,
    NestFecthNotesByUserIdUseCase,
    NestToggleNoteAsFavoriteUseCase,
  ],
})
export class HttpModule {}
