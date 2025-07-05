import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { Comment, Prisma } from 'generated/prisma';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  // Создание комментария
  async create(
    createCommentDto: CreateCommentDto,
    artistId: number,
  ): Promise<Comment> {
    if (!createCommentDto.text) {
      throw new BadRequestException('Comment text is required');
    }

    const trackExists = await this.prisma.track.findUnique({
      where: { id: +createCommentDto.trackId },
    });
    if (!trackExists) {
      throw new NotFoundException(
        `Трек с ID ${createCommentDto.trackId} не найден.`,
      );
    }

    const artistExists = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });
    if (!artistExists) {
      throw new NotFoundException(`Артист с ID ${artistId} не найден.`);
    }

    return this.prisma.comment.create({
      data: {
        text: createCommentDto.text,
        artist: {
          connect: { id: artistId },
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
  async likeOrDislike(
    commentId: number,
    type: 'like' | 'dislike',
    artistId: number,
  ): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    const existingVote = await this.prisma.commentVote.findUnique({
      where: {
        commentId_artistId: {
          commentId,
          artistId,
        },
      },
    });

    let updatedComment: Comment;

    if (existingVote) {
      // Пользователь уже голосовал
      if (existingVote.type === type) {
        // Кликнул на тот же тип - отменить голос
        await this.prisma.commentVote.delete({
          where: { id: existingVote.id },
        });
        updatedComment = await this.prisma.comment.update({
          where: { id: commentId },
          data: {
            [type]: { decrement: 1 },
          },
          include: {
            track: { select: { id: true } },
            artist: {
              select: { id: true, nickname: true, name: true, avatar: true },
            },
          },
        });
      } else {
        // Кликнул на противоположный тип - сменить голос
        await this.prisma.commentVote.update({
          where: { id: existingVote.id },
          data: { type },
        });
        updatedComment = await this.prisma.comment.update({
          where: { id: commentId },
          data: {
            [type]: { increment: 1 },
            [existingVote.type]: { decrement: 1 },
          },
          include: {
            track: { select: { id: true } },
            artist: {
              select: { id: true, nickname: true, name: true, avatar: true },
            },
          },
        });
      }
    } else {
      // Пользователь голосует впервые
      await this.prisma.commentVote.create({
        data: {
          commentId,
          artistId,
          type,
        },
      });
      updatedComment = await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          [type]: { increment: 1 },
        },
        include: {
          track: { select: { id: true } },
          artist: {
            select: { id: true, nickname: true, name: true, avatar: true },
          },
        },
      });
    }

    return updatedComment;
  }

  // Удалить комментарий
  async delete(commentId: number): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    // Prisma автоматически удалит onDelete: Cascade
    return this.prisma.comment.delete({
      where: { id: commentId },
      include: {
        track: { select: { id: true } },
      },
    });
  }

  // Получить все комментарии по треку
  async findByTrack(
    trackId: number,
    currentArtistId?: number,
  ): Promise<Comment[]> {
    const comments = await this.prisma.comment.findMany({
      where: { trackId },
      include: {
        artist: {
          select: {
            id: true,
            nickname: true,
            avatar: true,
            name: true,
          },
        },
        track: { select: { id: true, title: true } },
        votes: currentArtistId
          ? {
              where: { artistId: currentArtistId },
              select: { type: true },
            }
          : false,
      },
      orderBy: { createdAt: 'desc' },
    });

    return comments.map((comment) => {
      const currentUserVoteStatus =
        comment.votes && comment.votes.length > 0
          ? (comment.votes[0].type as 'like' | 'dislike')
          : null;

      // Удаляем временное поле 'votes' из объекта
      const { votes, ...rest } = comment;
      return {
        ...rest,
        currentUserVoteStatus,
      };
    }) as Comment[];
  }
}
