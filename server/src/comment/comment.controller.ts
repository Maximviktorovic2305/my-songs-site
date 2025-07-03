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
    @CurrentArtist('id') id: number | string,
  ) {
    return this.commentService.create(createCommentDto, +id);
  }

  // Like-dislike комментария
  @Patch(':id/:type')
  @HttpCode(HttpStatus.OK)
  @Auth()
  likeOrDislike(
    @Param('id') commentId: number | string,
    @Param('type') type: 'like' | 'dislike',
  ) {
    return this.commentService.likeOrDislike(+commentId, type);
  }

  // Удалить комментарий
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth()
  delete(@Param('id') commentId: number | string) {
    return this.commentService.delete(+commentId);
  }

  // Получить все комментарии к треку
  @Get('track/:id')
  @HttpCode(HttpStatus.OK)
  getAllByTrack(@Param('id') trackId: number | string) {
    return this.commentService.findByTrack(+trackId);
  }
}
