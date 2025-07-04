import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  email: string;
}

export class RegisterAuthDto {
  @IsString()
  nickname: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  // avatar?: string | null
}

export class RefreshTokenDto {
  refreshToken: string;
}
