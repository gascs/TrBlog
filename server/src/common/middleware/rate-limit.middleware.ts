import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private redisService: RedisService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress || '';
    const path = req.path;
    const key = `rate_limit:${ip}:${path}`;

    try {
      // 获取当前请求次数
      const current = await this.redisService.get(key);
      const limit = 100; // 每分钟最多100次请求
      const windowMs = 60 * 1000; // 1分钟窗口

      if (current) {
        const count = parseInt(current, 10);
        if (count >= limit) {
          throw new HttpException(
            'Too Many Requests',
            HttpStatus.TOO_MANY_REQUESTS
          );
        }
        // 增加请求次数
        await this.redisService.set(key, (count + 1).toString(), windowMs / 1000);
      } else {
        // 第一次请求，设置计数器
        await this.redisService.set(key, '1', windowMs / 1000);
      }

      next();
    } catch (error) {
      console.error('Rate limit error:', error);
      // 如果Redis出错，允许请求继续，不阻塞业务
      next();
    }
  }
}