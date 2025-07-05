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
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { CurrentArtist } from 'src/auth/decorators/artist.decorator';
import { trackFileUploadOptions } from 'src/utils/file-upload';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { EnumGenres } from 'generated/prisma';
import { SortType } from './types';

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

  // Получить все треки с фильтрами
  @Get('filter')
  @HttpCode(HttpStatus.OK)
  async findFilteredTracks(
    @Query('genres') genresString?: string,
    @Query('title') title?: string,
    @Query('artistId') artistId?: number | string,
    @Query('artistNickname') artistNickname?: string,
    @Query('sortRating') sortRating?: SortType,
    @Query('sortByDate') sortByDate?: SortType,
  ) {
    const genres = genresString
      ? (genresString
          .split(',')
          .map((g) => g.trim().toUpperCase()) as EnumGenres[])
      : undefined;

    return this.trackService.findFilteredTracks({
      genres,
      title,
      artistId,
      artistNickname,
      sortRating,
      sortByDate,
    });
  }

  // Поиск треков по названию
  @Get('search')
  @HttpCode(HttpStatus.OK)
  searchTracks(@Query('title') title: string) {
    return this.trackService.findTracksByTitle(title);
  }

  // Поиск треков по жанру
  @Get('genres')
  @HttpCode(HttpStatus.OK)
  async findTracksByGenre(@Query('genres') genresString: string) {
    const genres = genresString
      .split(',')
      .map((g) => g.trim().toUpperCase()) as EnumGenres[];

    return this.trackService.findTracksByGenres(genres);
  }

  // Получить треки, отсортированные по рейтингу
  @Get('rating')
  @HttpCode(HttpStatus.OK)
  async findTracksByRating(@Query('order') order: SortType = 'desc') {
    return this.trackService.findTracksByRating(order);
  }

  // Получить треки, сортировка по дате добавления
  @Get('date')
  @HttpCode(HttpStatus.OK)
  async findTracksByDate(@Query('order') order: SortType = 'desc') {
    return this.trackService.findTracksByDate(order);
  }

  // Получить треки, по id или имени артиста
  @Get('artist')
  @HttpCode(HttpStatus.OK)
  async getTracksByArtist(
    @Query('artistId') artistId?: number | string,
    @Query('artistNickname') artistNickname?: string,
  ) {
    return this.trackService.findTracksByArtist(artistId, artistNickname);
  }

  // Добавление/удаление трека из избранного
  @Patch(':id/favorite')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async toggleFavorite(
    @Param('id') trackId: number | string,
    @CurrentArtist('id') artistId: number | string,
  ) {
    const isAdded = await this.trackService.toggleFavoriteTrack(
      +artistId,
      +trackId,
    );

    return {
      message: isAdded
        ? 'Трек добавлен в избранное.'
        : 'Трек удален из избранного.',
      isFavorite: isAdded,
    };
  }

  // Получить все избранные треки текущего артиста
  @Get('favorites')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async getFavoriteTracks(@CurrentArtist('id') artistId: number) {
    return this.trackService.getFavoriteTracksByArtist(artistId);
  }

  // Получить трек по id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number | string) {
    return this.trackService.findTrackById(+id);
  }

  // Установить рейтинг для трека
  @Patch(':id/rating/:rating')
  @Auth()
  @HttpCode(HttpStatus.OK)
  async setTrackRating(
    @Param('id') trackId: number | string,
    @Param('rating') rating: number | string,
    @CurrentArtist('id') artistId: number | string,
  ) {
    // console.log(`[TrackController] setTrackRating: Track ID: ${trackId}, Rating: ${rating}, Artist ID: ${artistId}`);
    return this.trackService.setTrackRating(+trackId, +rating, +artistId);
  }

  // Удалить трек
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number | string) {
    return this.trackService.deleteTrack(+id);
  }
}
