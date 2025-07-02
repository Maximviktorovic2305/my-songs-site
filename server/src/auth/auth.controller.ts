import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CurrentArtist } from './decorators/artist.decorator';
import { LoginAuthDto, RefreshTokenDto, RegisterAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Регистрация для Userа
  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  // Логин для Userа
  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  // Обновление токенов
  @Post('login/access-token')
  @HttpCode(200)
  getNewTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.getNewTokens(refreshTokenDto.refreshToken);
  }

  // Получение своего профиля
  @Get('me')
  @Auth()
  @HttpCode(200)
  getProfile(@CurrentArtist('id') artistId: number) {
    return this.authService.getProfile(+artistId);
  }
}
