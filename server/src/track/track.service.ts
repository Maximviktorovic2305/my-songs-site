import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/prisma.service';
import { EnumGenres, Prisma, Track } from 'generated/prisma';
import { FilterOptions, SortType } from './types';

interface UploadedTrackFiles {
  audio?: Express.Multer.File[];
  image?: Express.Multer.File[];
}

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  // Создать трек
  async createTrack(
    createTrackDto: CreateTrackDto,
    files: UploadedTrackFiles,
    artistId: number,
  ): Promise<Track> {
    // 1. Валидация и преобразование жанров
    const genresAsStrings = (createTrackDto.genres as unknown as string)
      .split(',')
      .map((g: string) => g.trim().toUpperCase());

    const validEnumGenres = Object.values(EnumGenres);
    const validatedGenres: EnumGenres[] = [];

    if (genresAsStrings.length === 0) {
      throw new BadRequestException('Выберите хотя бы один жанр.');
    }

    for (const genre of genresAsStrings) {
      if (!validEnumGenres.includes(genre as EnumGenres)) {
        throw new BadRequestException(`Неверный жанр: ${genre}.`);
      }
      validatedGenres.push(genre as EnumGenres);
    }

    const audioFile = files.audio ? files.audio[0] : undefined;
    const imageFile = files.image ? files.image[0] : undefined;

    if (!audioFile) {
      throw new BadRequestException('Аудиофайл обязателен.');
    }

    const audioPath = `/uploads/${audioFile.filename}`;
    const imagePath = imageFile ? `/uploads/${imageFile.filename}` : undefined;

    // Создание записи трека в базе данных
    return this.prisma.track.create({
      data: {
        title: createTrackDto.title,
        genres: validatedGenres,
        src: audioPath,
        img: imagePath || '/uploads/no-image.png',
        artist: artistId ? { connect: { id: artistId } } : undefined,
      },
    });
  }

  // Получить все треки
  async findAllTracks() {
    return this.prisma.track.findMany({
      select: {
        id: true,
        title: true,
        src: true,
        img: true,
        genres: true,
        createdAt: true,
        rayting: true,
        isNew: true,
        comments: true,
        artist: {
          select: {
            id: true,
            nickname: true,
            name: true,
          },
        },
      },
    });
  }

  async findFilteredTracks(options: FilterOptions) {
    const { genres, title, artistId, artistNickname, sortRating, sortByDate } =
      options;

    // Валидация жанров
    if (genres) {
      const validEnumGenres = Object.values(EnumGenres);
      for (const genre of genres) {
        if (!validEnumGenres.includes(genre)) {
          throw new BadRequestException(`Неверный жанр: ${genre}`);
        }
      }
    }

    // Формируем условия where
    const where: Prisma.TrackWhereInput = {};

    if (genres && genres.length > 0) {
      where.genres = {
        hasSome: genres,
      };
    }

    if (title) {
      where.title = {
        contains: title.trim(),
        mode: 'insensitive',
      };
    }

    const artistWhere: Prisma.ArtistWhereInput = {};

    if (artistId) {
      artistWhere.id = +artistId;
    }

    if (artistNickname) {
      artistWhere.nickname = {
        contains: artistNickname.trim(),
        mode: 'insensitive',
      };
    }

    // Если были заданы условия фильтрации по артисту, добавляем их в основной запрос.
    if (Object.keys(artistWhere).length > 0) {
      where.artist = artistWhere;
    }

    // Сортировка
    const orderBy: Prisma.TrackOrderByWithRelationInput[] = [];

    if (sortRating) {
      orderBy.push({ rayting: sortRating as Prisma.SortOrder });
    }

    if (sortByDate) {
      orderBy.push({ createdAt: sortByDate as Prisma.SortOrder });
    }

    // Выполняем запрос
    return this.prisma.track.findMany({
      where,
      include: {
        artist: {
          select: {
            id: true,
            nickname: true,
            name: true,
          },
        },
        comments: true,
      },
      orderBy: orderBy.length > 0 ? orderBy : undefined,
    });
  }

  // Найти трек по id
  async findTrackById(id: number) {
    const track = await this.prisma.track.findUnique({
      where: { id },
      include: {
        artist: { select: { nickname: true, name: true, id: true } },
        comments: true,
      },
    });

    if (!track) {
      throw new NotFoundException(`Трек с ID ${id} не найден.`);
    }
    return track;
  }

  // Поиск треков по названию
  async findTracksByTitle(title: string) {
    if (!title || typeof title !== 'string') {
      throw new BadRequestException('Название трека должно быть строкой.');
    }

    const tracks = await this.prisma.track.findMany({
      where: {
        title: {
          contains: title.trim(), // Совпадение по части строки
          mode: 'insensitive', // Регистронезависимый поиск
        },
      },
      include: {
        artist: {
          select: {
            id: true,
            nickname: true,
            name: true,
          },
        },
        comments: true,
      },
    });

    if (tracks.length === 0) {
      throw new NotFoundException(`Треки с названием "${title}" не найдены.`);
    }

    return tracks;
  }

  // Найти треки по жанрам
  async findTracksByGenres(genres: EnumGenres[]) {
    if (!genres || genres.length === 0) {
      throw new BadRequestException('Укажите хотя бы один жанр.');
    }

    // Проверка, что все переданные жанры существуют в enum
    const validEnumGenres = Object.values(EnumGenres);
    for (const genre of genres) {
      if (!validEnumGenres.includes(genre)) {
        throw new BadRequestException(`Неверный жанр: ${genre}`);
      }
    }

    // Используем hasSome для получения всех треков, где есть хотя бы один из указанных жанров
    const tracks = await this.prisma.track.findMany({
      where: {
        genres: {
          hasSome: genres,
        },
      },
      include: {
        artist: {
          select: {
            id: true,
            nickname: true,
            name: true,
          },
        },
        comments: true,
      },
    });

    return tracks;
  }

  // Найти треки и отсортировать по рейтингу
  async findTracksByRating(order: SortType) {
    const tracks = await this.prisma.track.findMany({
      include: {
        artist: {
          select: {
            id: true,
            nickname: true,
            name: true,
          },
        },
        comments: true,
      },
      orderBy: {
        rayting: order as Prisma.SortOrder,
      },
    });

    return tracks;
  }

  // Получить треки, сортировка по дате добавления
  async findTracksByDate(order: SortType) {
    const tracks = await this.prisma.track.findMany({
      include: {
        artist: {
          select: {
            id: true,
            nickname: true,
            name: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: order as Prisma.SortOrder,
      },
    });

    return tracks;
  }

  // Получить треки, по id или имени артиста
  async findTracksByArtist(
    artistId?: number | string,
    artistNickname?: string,
  ): Promise<Track[]> {
    const where: Prisma.TrackWhereInput = {};

    if (artistId) {
      where.artist = {
        id: +artistId,
      };
    } else if (artistNickname) {
      where.artist = {
        nickname: {
          equals: artistNickname.trim(),
          mode: 'insensitive',
        },
      };
    } else {
      throw new BadRequestException('Укажите ID или nickname артиста.');
    }

    return this.prisma.track.findMany({
      where,
      include: {
        artist: {
          select: {
            id: true,
            nickname: true,
            name: true,
          },
        },
        comments: true,
      },
    });
  }

  // Единый метод для добавления или удаления трека из избранного
  async toggleFavoriteTrack(artistId: number, trackId: number) {
  console.log("artistId:", artistId); // Для отладки
  console.log("trackId:", trackId);

  const trackExists = await this.prisma.track.findUnique({
    where: { id: trackId },
  });
  if (!trackExists) {
    throw new NotFoundException(`Трек с ID ${trackId} не найден.`);
  }

  const artistExists = await this.prisma.artist.findUnique({
    where: { id: artistId },
  });
  if (!artistExists) {
    throw new NotFoundException(`Артист с ID ${artistId} не найден.`);
  }

  const existingFavorite = await this.prisma.favoriteOnArtist.findUnique({
    where: {
      artistId_trackId: {
        artistId,
        trackId,
      },
    },
  });

  if (existingFavorite) {
    await this.prisma.favoriteOnArtist.delete({
      where: {
        artistId_trackId: {
          artistId,
          trackId,
        },
      },
    });
    return false;
  } else {
    await this.prisma.favoriteOnArtist.create({
      data: {
        artistId,
        trackId,
      },
    });
    return true;
  }
}

  // Получить все избранные треки текущего артиста
  async getFavoriteTracksByArtist(artistId: number) {
    // Находим все записи в FavoriteOnArtist для данного артиста
    const favoriteEntries = await this.prisma.favoriteOnArtist.findMany({
      where: {
        artistId: artistId,
      },
      include: {
        track: {
          include: {
            artist: {
              select: {
                id: true,
                nickname: true,
                name: true,
              },
            },
            comments: true,
          },
        },
      },
    });

    return favoriteEntries.map((entry) => entry.track);
  }

  // Установить рейтинг для трека
  async setTrackRating(trackId: number, rating: number): Promise<Track> {
    if (rating < 0 || rating > 5) {
      throw new BadRequestException(
        'Рейтинг должен быть от 0 до 5 включительно.',
      );
    }

    const existingTrack = await this.prisma.track.findUnique({
      where: { id: trackId },
    });

    if (!existingTrack) {
      throw new NotFoundException(`Трек с ID ${trackId} не найден.`);
    }

    return this.prisma.track.update({
      where: { id: trackId },
      data: { rayting: rating },
    });
  }

  // Удаление трека
  async deleteTrack(id: number) {
    const existingTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!existingTrack) {
      throw new NotFoundException(`Трек с ID ${id} не найден.`);
    }

    return this.prisma.track.delete({
      where: { id },
    });
  }
}
