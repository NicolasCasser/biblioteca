import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const configuredPort = configService.get<number>('API_PORT');
  const port = typeof configuredPort === 'number' ? configuredPort : 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`Application is running: http://localhost:${port}/api/docs`);
}
void bootstrap();
