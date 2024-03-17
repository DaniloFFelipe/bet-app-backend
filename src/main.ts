import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { env } from './libs/env';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  await app.listen(env.PORT);
}

bootstrap();
