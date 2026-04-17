import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redisClient: Redis;

  // 缓存过期时间配置（秒）
  private readonly TTL = {
    // 文章列表缓存：1小时
    POSTS_LIST: 3600,
    // 文章详情缓存：30分钟
    POST_DETAIL: 1800,
    // 分类缓存：2小时
    CATEGORIES: 7200,
    // 标签缓存：2小时
    TAGS: 7200,
  };

  constructor(private configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
    this.redisClient = new Redis(redisUrl);
  }

  async onModuleInit() {
    try {
      await this.redisClient.ping();
      console.log('Redis connection established');
      // 缓存预热
      await this.warmupCache();
    } catch (error) {
      console.error('Redis connection failed:', error);
    }
  }

  async onModuleDestroy() {
    await this.redisClient.disconnect();
  }

  async get(key: string): Promise<string | null> {
    try {
      const startTime = Date.now();
      const result = await this.redisClient.get(key);
      const endTime = Date.now();
      // 记录缓存访问时间
      console.log(`Redis get ${key}: ${endTime - startTime}ms`);
      return result;
    } catch (error) {
      console.error('Redis get error:', error);
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.redisClient.set(key, value, 'EX', ttl);
      } else {
        await this.redisClient.set(key, value);
      }
    } catch (error) {
      console.error('Redis set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      console.error('Redis del error:', error);
    }
  }

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await this.redisClient.keys(pattern);
      if (keys.length > 0) {
        await this.redisClient.del(...keys);
      }
    } catch (error) {
      console.error('Redis delPattern error:', error);
    }
  }

  async getClient(): Promise<Redis> {
    return this.redisClient;
  }

  // 获取缓存过期时间
  getTTL(type: keyof typeof this.TTL): number {
    return this.TTL[type];
  }

  // 缓存预热
  private async warmupCache(): Promise<void> {
    try {
      console.log('Starting cache warmup...');
      // 这里可以添加预热逻辑，例如加载热门文章、分类、标签等
      // 例如：await this.preloadPopularPosts();
      console.log('Cache warmup completed');
    } catch (error) {
      console.error('Cache warmup error:', error);
    }
  }

  // 监控缓存使用情况
  async monitorCache(): Promise<void> {
    try {
      const keys = await this.redisClient.keys('*');
      console.log(`Total cache keys: ${keys.length}`);
      
      for (const key of keys) {
        const ttl = await this.redisClient.ttl(key);
        console.log(`Key: ${key}, TTL: ${ttl}s`);
      }
    } catch (error) {
      console.error('Cache monitor error:', error);
    }
  }
}