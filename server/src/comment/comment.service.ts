import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { Comment, Prisma } from 'generated/prisma';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание комментария
  create(createCommentDto: CreateCommentDto, id: number): Promise<Comment> {
    if (!createCommentDto.text)
      throw new BadRequestException('Comment text is required');

    return this.prisma.comment.create({
      data: {
        text: createCommentDto.text,
        artist: {
          connect: { id },
        },
        track: {
          connect: {
            id: +createCommentDto.trackId,
          },
        },
        like: 0,
        dislike: 0,
      },
      include: {
        artist: {
          select: { id: true, nickname: true, name: true, avatar: true },
        },
        track: { select: { id: true, title: true } },
      },
    });
  }

  // Like-dislike комментария
  async likeOrDislike(commentId: number, type: 'like' | 'dislike') {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    const updateData: Prisma.CommentUpdateInput = {};

    if (type === 'like') {
      updateData.like = (comment.like ?? 0) + 1;
    } else if (type === 'dislike') {
      updateData.dislike = (comment.dislike ?? 0) + 1;
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: updateData,
      include: {
        track: {
          select: {
            id: true,
          },
        },
        artist: {
          select: { id: true, nickname: true, name: true, avatar: true },
        },
      },
    });
  }

  // Удалить комментарий
  async delete(commentId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
      include: {
        track: { select: { id: true } },
      },
    });
  }

  // Получить все комментарии по треку
  async findByTrack(trackId: number) {
    return this.prisma.comment.findMany({
      where: { trackId },
      include: {
        artist: {
          select: {
            nickname: true,
            avatar: true,
            name: true,
            id: true,
          },
        },
        track: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
