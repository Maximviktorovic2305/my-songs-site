import {
  IsEmail,
  IsNotEmpty,
  isNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}

export class GetProfileDto {
  userId: number;
}
