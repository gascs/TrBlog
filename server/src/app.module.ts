import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { RedisModule } from './redis/redis.module';
import { HealthModule } from './health/health.module';
import { SitemapModule } from './sitemap/sitemap.module';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';
import { OriginCheckMiddleware } from './common/middleware/origin-check.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    HealthModule,
    SitemapModule,
    UserModule,
    AuthModule,
    PostModule,
    CategoryModule,
    TagModule,
    CommentModule,
  ],
  controllers: [],
  providers: [
    RateLimitMiddleware,
    OriginCheckMiddleware,
  ],
})
export class AppModule {}
