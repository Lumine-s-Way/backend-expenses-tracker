import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{
    cors: true,
    // logger:['error','warn','log'],
  });

  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=1.0',
  });
  
  app.use(helmet());

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
