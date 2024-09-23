import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './middlewares/http-err-handler.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter()); // for err handling
  app.use(cookieParser()); // to read cookies

  const configService = app.get(ConfigService); // for env variables
  const port = configService.get<number>('PORT') || 4000;

  await app.listen(port);
}
bootstrap();
