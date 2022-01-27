import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
