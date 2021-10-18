/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { ServerModule } from '@npl/server';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.enableCors();
  await app.listen(3333);
  console.log(
    'Server runnng at',
    `http://localhost:${app.getHttpServer().address().port}`
  );
}

bootstrap();
