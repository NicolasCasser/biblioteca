import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const configuredPort = configService.get<number>('API_PORT');
  const port = typeof configuredPort === 'number' ? configuredPort : 3000;
  await app.listen(process.env.PORT ?? 3000);
  const logger = new Logger('Bootstrap');
  logger.log(`Application is running: http://localhost:${port}/api/docs`);
}
bootstrap();
