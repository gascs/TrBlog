import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, authorId: string) {
    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId,
      },
      include: {
        author: true,
        post: true,
        parent: true,
      },
    });
  }

  async findByPostId(postId: string) {
    return this.prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      include: {
        author: true,
        replies: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: string, authorId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment.authorId !== authorId) {
      throw new NotFoundException('You can only delete your own comments');
    }

    return this.prisma.comment.delete({ where: { id } });
  }
}