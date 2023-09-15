import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import * as Joi from 'joi';
import { config } from '@config';
import { AuthModule } from '@auth';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    isGlobal: true,
    load: [config],
    validationSchema: Joi.object({
      API_KEY: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      DB_HOST: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USER: Joi.string().required(),
    }),
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
