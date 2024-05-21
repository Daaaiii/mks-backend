import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerDocumentConfig } from './doc/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, swaggerDocumentConfig);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);

  app.enableCors();
}
bootstrap();
