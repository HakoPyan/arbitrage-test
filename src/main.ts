import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NewsModule } from './news/news.module';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(NewsModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();
