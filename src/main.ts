import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configservice = new ConfigService();
  const port: number = configservice.get<number>("SERVER_PORT");
  const app = await NestFactory.create(AppModule);
  
  await app.listen(port?? 3000);
}
bootstrap();
