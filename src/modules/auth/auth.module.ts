import { Module } from '@nestjs/common';
import { UsersController } from '@auth/controllers';
import { UsersService } from '@auth/services';
import { authProviders } from './providers';
import { DatabaseModule } from '@database';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...authProviders, UsersService],
  exports: [UsersService],
})
export class AuthModule { }
