import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
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
  @Auth()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @CurrentArtist('id') id: number | string,
  ) {
    return this.commentService.create(createCommentDto, +id);
  }

  // Like-dislike комментария
  @Patch(':id/:type')
  @Auth()
  likeOrDislike(
    @Param('id') commentId: number | string,
    @Param('type') type: 'like' | 'dislike',
  ) {
    return this.commentService.likeOrDislike(+commentId, type);
  }

  // Удалить комментарий
  @Delete(':id')
  @Auth()
  delete(@Param('id') commentId: number | string) {
    return this.commentService.delete(+commentId);
  }

  // Получить все комментарии к треку
  @Get('track/:trackId')
  getAllByTrack(@Param('trackId') trackId: number | string) {
    return this.commentService.findByTrack(+trackId);
  }
}
