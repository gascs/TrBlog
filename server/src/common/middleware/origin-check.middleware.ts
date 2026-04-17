import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class OriginCheckMiddleware implements NestMiddleware {
  private readonly allowedOrigins = [
    'http://localhost:5173', // 开发环境
    'https://your-domain.com', // 生产环境
  ];

  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;
    const referer = req.headers.referer;

    // 检查Origin头
    if (origin) {
      const isAllowed = this.allowedOrigins.some(allowedOrigin => 
        origin === allowedOrigin || origin.startsWith(allowedOrigin)
      );

      if (!isAllowed) {
        throw new HttpException(
          'Forbidden: Invalid origin',
          HttpStatus.FORBIDDEN
        );
      }
    }

    // 检查Referer头
    if (referer) {
      const isAllowed = this.allowedOrigins.some(allowedOrigin => 
        referer.startsWith(allowedOrigin)
      );

      if (!isAllowed) {
        throw new HttpException(
          'Forbidden: Invalid referer',
          HttpStatus.FORBIDDEN
        );
      }
    }

    next();
  }
}