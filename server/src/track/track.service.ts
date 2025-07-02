import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { PrismaService } from 'src/prisma.service';
import { EnumGenres, Track } from 'generated/prisma';

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
