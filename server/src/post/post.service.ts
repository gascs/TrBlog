import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { RedisService } from '../redis/redis.service';
import { XssProtectionService } from '../common/services/xss-protection.service';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService, 
    private redisService: RedisService,
    private xssProtectionService: XssProtectionService
  ) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    const { tagIds, ...postData } = createPostDto;

    // 过滤用户输入，防止XSS攻击
    const sanitizedPostData = {
      ...postData,
      title: this.xssProtectionService.sanitizeString(postData.title),
      content: this.xssProtectionService.sanitizeHtml(postData.content),
      excerpt: postData.excerpt ? this.xssProtectionService.sanitizeString(postData.excerpt) : undefined,
    };

    const post = await this.prisma.post.create({
      data: {
        ...sanitizedPostData,
        authorId: userId,
        tags: tagIds
          ? {
              connect: tagIds.map((id) => ({ id })),
            }
          : undefined,
      } as any,
      include: {
        author: { select: { id: true, username: true, email: true } },
        category: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } },
      },
    });

    // 清除文章列表缓存
    await this.redisService.del('posts:*').catch(console.error);

    return post;
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    categoryId?: string;
    tagId?: string;
    search?: string;
  }) {
    const {
      page = 1,
      limit = 10,
      categoryId,
      tagId,
      search,
    } = params;

    // 生成缓存键
    const cacheKey = `posts:${page}:${limit}:${categoryId || 'all'}:${tagId || 'all'}:${search || 'none'}`;

    // 尝试从缓存获取
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const skip = (page - 1) * limit;

    const where = {
      ...(categoryId && { categoryId }),
      ...(tagId && {
        tags: {
          some: { id: tagId },
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as any } },
          { content: { contains: search, mode: 'insensitive' as any } },
          { excerpt: { contains: search, mode: 'insensitive' as any } },
        ],
      }),
    };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, username: true } },
          category: { select: { id: true, name: true } },
          tags: { select: { id: true, name: true } },
        },
      }),
      this.prisma.post.count({ where }),
    ]);

    const result = {
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    // 缓存结果，设置30分钟过期
    await this.redisService.set(cacheKey, JSON.stringify(result), 1800);

    return result;
  }

  async findOne(id: string) {
    // 生成缓存键
    const cacheKey = `post:${id}`;

    // 尝试从缓存获取
    const cachedData = await this.redisService.get(cacheKey);
    if (cachedData) {
      // 异步增加浏览量，不阻塞响应
      this.prisma.post.update({
        where: { id },
        data: { views: { increment: 1 } },
      }).catch(console.error);
      
      // 清除缓存，确保下次获取最新数据
      this.redisService.del(cacheKey).catch(console.error);
      
      return JSON.parse(cachedData);
    }

    // 使用事务确保浏览量增加和帖子查询的原子性
    const post = await this.prisma.$transaction(async (prisma) => {
      // 增加浏览量
      await prisma.post.update({
        where: { id },
        data: { views: { increment: 1 } },
      });

      // 查询帖子详情
      const postData = await prisma.post.findUnique({
        where: { id },
        include: {
          author: { select: { id: true, username: true, email: true } },
          category: { select: { id: true, name: true } },
          tags: { select: { id: true, name: true } },
          comments: {
            include: {
              author: { select: { id: true, username: true } },
              parent: { select: { id: true, author: { select: { id: true, username: true } } } },
            },
            orderBy: { createdAt: 'desc' },
            take: 50, // 限制评论数量，提高性能
          },
        },
      });

      return postData;
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // 缓存结果，设置10分钟过期
    await this.redisService.set(cacheKey, JSON.stringify(post), 600);

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const { tagIds, ...postData } = updatePostDto;

    // 过滤用户输入，防止XSS攻击
    const sanitizedPostData: any = {};
    if (postData.title) {
      sanitizedPostData.title = this.xssProtectionService.sanitizeString(postData.title);
    }
    if (postData.content) {
      sanitizedPostData.content = this.xssProtectionService.sanitizeHtml(postData.content);
    }
    if (postData.excerpt) {
      sanitizedPostData.excerpt = this.xssProtectionService.sanitizeString(postData.excerpt);
    }
    if (postData.categoryId) {
      sanitizedPostData.categoryId = postData.categoryId;
    }

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        ...sanitizedPostData,
        tags: tagIds
          ? {
              set: tagIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        author: { select: { id: true, username: true, email: true } },
        category: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } },
      },
    });

    // 清除相关缓存
    await this.redisService.del(`post:${id}`).catch(console.error);
    await this.redisService.del('posts:*').catch(console.error);

    return post;
  }

  async remove(id: string) {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.prisma.post.delete({ where: { id } });

    // 清除相关缓存
    await this.redisService.del(`post:${id}`).catch(console.error);
    await this.redisService.del('posts:*').catch(console.error);
  }
}