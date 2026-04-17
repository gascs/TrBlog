import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@Controller('health')
export class HealthController {
  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  @Get()
  async getHealthStatus() {
    const dbStatus = await this.checkDatabase();
    const redisStatus = await this.checkRedis();

    const overallStatus = dbStatus.healthy && redisStatus.healthy ? 'healthy' : 'degraded';

    return {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks: {
        database: dbStatus,
        redis: redisStatus,
      },
    };
  }

  private async checkDatabase() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return {
        healthy: true,
        message: 'Database connection healthy',
      };
    } catch (error) {
      return {
        healthy: false,
        message: `Database connection failed: ${error.message}`,
      };
    }
  }

  private async checkRedis() {
    try {
      const client = await this.redisService.getClient();
      await client.ping();
      return {
        healthy: true,
        message: 'Redis connection healthy',
      };
    } catch (error) {
      return {
        healthy: false,
        message: `Redis connection failed: ${error.message}`,
      };
    }
  }
}