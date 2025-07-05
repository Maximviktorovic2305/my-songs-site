import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentArtist } from 'src/auth/decorators/artist.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Создание комментария
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentArtist('id') artistId: string | number, 
  ) {
    return this.commentService.create(createCommentDto, +artistId);
  }

  // Like-dislike комментария
  @Patch(':id/:type')
  @HttpCode(HttpStatus.OK)
  @Auth()
  likeOrDislike(
    @Param('id') commentId: string | number,
    @Param('type') type: 'like' | 'dislike',
    @CurrentArtist('id') artistId: string | number, 
  ) {
    if (type !== 'like' && type !== 'dislike') {
      throw new BadRequestException('Неверный тип оценки. Допустимо: "like" или "dislike".');
    }
    return this.commentService.likeOrDislike(+commentId, type, +artistId); 
  }

  // Удалить комментарий
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  delete(@Param('id') commentId: string | number) {
    return this.commentService.delete(+commentId);
  }

  // Получить все комментарии к треку
  @Get('track/:id')
  @HttpCode(HttpStatus.OK)
  getAllByTrack(
    @Param('id') trackId: string | number,
  ) {
    return this.commentService.findByTrack(+trackId); 
  }
}
