import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  ParseIntPipe,
  Get,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { CurrentArtist } from 'src/auth/decorators/artist.decorator';
import { trackFileUploadOptions } from 'src/utils/file-upload';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  // Создать трек
  @Post()
  @Auth()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'audio', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ],
      trackFileUploadOptions,
    ),
  )
  async create(
    @Body() body: CreateTrackDto,
    @CurrentArtist('id') id: number | string,
    @UploadedFiles()
    files: { audio?: Express.Multer.File[]; image?: Express.Multer.File[] },
  ) {
    return this.trackService.createTrack(body, files, +id);
  }

  // Получить все треки
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.trackService.findAllTracks();
  }

  // Получить трек по id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.trackService.findTrackById(id);
  }

  // Удалить трек
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.trackService.deleteTrack(id);
  }
}
