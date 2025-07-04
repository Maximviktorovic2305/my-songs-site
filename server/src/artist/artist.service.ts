import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import { returnArtistObject } from './return-artist.object';
import { RegisterAuthDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  // Получение профиля пользователем по id
  async getByArtistId(artistId: number) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: artistId,
      },
      select: {
        ...returnArtistObject,
      },
    });

    if (!artist) throw new NotFoundException('Пользователь не найден');

    return artist;
  }

  async create(dto: RegisterAuthDto, avatarPath: string | null) { 
    const { nickname, name, email, password } = dto; 

    return this.prisma.artist.create({
      data: {
        nickname,
        name,
        email,
        password,
        avatar: avatarPath, 
      },
    });
  }

  // Получение всех пользователей администратором
  async getAllArtists() {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  // Удаление пользователя администратором
  async deleteArtist(artistId: number) {
    await this.prisma.artist.delete({
      where: { id: artistId },
    });

    return {
      message: 'Пользователь удален',
    };
  }
}
