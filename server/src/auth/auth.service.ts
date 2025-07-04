import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/create-auth.dto';
import { ArtistService } from 'src/artist/artist.service';
import { Artist } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private artistService: ArtistService,
  ) {}

  // Генерируем токены
  private async issueTokens(artistId: number) {
    const data = { id: artistId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
  }

  // Возвращаемые поля пользователя
  private returnArtistFields(artist: Artist) {
    return {
      id: artist.id,
      nickname: artist.nickname,
      name: artist.name,
      email: artist.email,
      avatar: artist.avatar,
      role: artist.role,
    };
  }

  // Проверяем пароль пользователя
  private async validateArtist(loginAuthDto: LoginAuthDto) {
    const artist = await this.prisma.artist.findUnique({
      where: { email: loginAuthDto.email },
    });
    if (!artist) throw new NotFoundException('Пользователь не найден');

    const isValid = await argon2.verify(artist.password, loginAuthDto.password);
    if (!isValid) throw new NotFoundException('Не верный пароль');

    return artist;
  }

  // Зарегистрировать пользователя
  async register(registerAuthDto: RegisterAuthDto, avatarPath: string | null) {
    const isArtistWithEmailExists = await this.prisma.artist.findUnique({
      where: { email: registerAuthDto.email },
    });
    if (isArtistWithEmailExists) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const isArtistWithNicknameExists = await this.prisma.artist.findUnique({
      where: { nickname: registerAuthDto.nickname },
    });

    if (isArtistWithNicknameExists) {
      throw new ConflictException(
        'Пользователь с таким никнеймом уже существует',
      );
    }

    const hashedPassword = await argon2.hash(registerAuthDto.password);

    const dtoWithHashedPassword = {
      ...registerAuthDto,
      password: hashedPassword,
    };

    const artist = await this.artistService.create(
      dtoWithHashedPassword,
      avatarPath,
    );
    const tokens = await this.issueTokens(artist.id);

    return {
      artist: this.returnArtistFields(artist),
      ...tokens,
    };
  }

  // Логин пользователя
  async login(loginAuthDto: LoginAuthDto) {
    const artist = await this.validateArtist(loginAuthDto);

    const tokens = await this.issueTokens(artist.id);

    return {
      artist: this.returnArtistFields(artist),
      ...tokens,
    };
  }

  // Получить свой профайл
  async getProfile(artistId: number) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      throw new BadRequestException('Пользователь не найден');
    }

    const tokens = await this.issueTokens(artist.id);

    return {
      artist: this.returnArtistFields(artist),
      ...tokens,
    };
  }

  // Получить новые токены
  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!refreshToken) throw new UnauthorizedException('Ошибка токена');

    const artist = await this.artistService.getByArtistId(result.id);

    const tokens = await this.issueTokens(artist.id);

    return {
      artist: this.returnArtistFields(artist),
      ...tokens,
    };
  }
}
