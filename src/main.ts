import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './EnvironmentVariables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(EnvironmentVariables.config.port);
  console.log(`Server running on port: ${EnvironmentVariables.config.port}`);
}
bootstrap();
