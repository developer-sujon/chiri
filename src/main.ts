import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { ValidationPipe } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({ origin: '*' });
  app.setGlobalPrefix(process.env.API_PATH); //route prefix

  const yamlContent = fs.readFileSync(
    path.join(process.cwd(), 'swagger.yaml'),
    'utf-8',
  );
  const document: OpenAPIObject = yaml.load(yamlContent) as OpenAPIObject;

  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
