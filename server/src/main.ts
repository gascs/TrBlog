import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { OriginCheckMiddleware } from './common/middleware/origin-check.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 使用helmet增强安全性
  app.use(helmet());
  
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : true,
    credentials: true,
  });
  
  // 应用中间件
  const rateLimitMiddleware = app.get(RateLimitMiddleware);
  const originCheckMiddleware = app.get(OriginCheckMiddleware);
  app.use(rateLimitMiddleware.use.bind(rateLimitMiddleware));
  app.use(originCheckMiddleware.use.bind(originCheckMiddleware));
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
}
bootstrap();
