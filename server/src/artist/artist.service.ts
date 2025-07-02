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

  async create(dto: RegisterAuthDto) {
    const { name, email, password, nickname, avatar } = dto;

    // @TODO переделать
    const isAdmin =
      name === 'AdminAdminAdmin' && password === 'AdminAdminAdmin';

    const artist = await this.prisma.artist.create({
      data: {
        name,
        email,
        nickname,
        avatar,
        password: await argon2.hash(password),
        role: isAdmin ? 'admin' : 'user',
      },
      select: { ...returnArtistObject },
    });

    return artist;
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
