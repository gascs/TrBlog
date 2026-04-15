import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    const { tagIds, ...postData } = createPostDto;

    const post = await this.prisma.post.create({
      data: {
        ...postData,
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

    return {
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    // 增加浏览量
    await this.prisma.post.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    const post = await this.prisma.post.findUnique({
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
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const { tagIds, ...postData } = updatePostDto;

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        ...postData,
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

    return post;
  }

  async remove(id: string) {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    await this.prisma.post.delete({ where: { id } });
  }
}