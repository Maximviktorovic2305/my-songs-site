import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  email: string;
}

export class RegisterAuthDto {
  @IsOptional()
  @IsString()
  name: string;   

  @IsString()
  password: string;

  @IsEmail()
  @IsString()
  email: string;
}

export class RefreshTokenDto {
  refreshToken: string;
}

export class GetProfileDto {
  userId: number;
}