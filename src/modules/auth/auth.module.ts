import { Global, Module } from '@nestjs/common';
import { UsersController } from '@auth/controllers';
import { UsersService } from '@auth/services';
import { authProviders } from './providers';
import { DatabaseModule } from '@database';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from '@config';
import { ConfigType } from '@nestjs/config';

@Global()
@Module({
  imports: [DatabaseModule, PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),],
  controllers: [UsersController, AuthController],
  providers: [...authProviders, UsersService, AuthService,],
  exports: [UsersService,],
})
export class AuthModule { }
