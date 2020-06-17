import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './server/modules/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
