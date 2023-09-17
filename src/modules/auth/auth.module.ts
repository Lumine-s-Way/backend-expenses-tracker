import { Global, Module } from '@nestjs/common';
import { UsersController } from '@auth/controllers';
import { UsersService } from '@auth/services';
import { authProviders } from './providers';
import { DatabaseModule } from '@database';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Global()
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, AuthController],
  providers: [...authProviders, UsersService, AuthService],
  exports: [UsersService,],
})
export class AuthModule { }
