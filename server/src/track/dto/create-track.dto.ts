import { ArrayMinSize, IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { EnumGenres } from 'generated/prisma';

export class CreateTrackDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Выберите хотя бы один жанр.' })
  @IsEnum(EnumGenres, { each: true, message: 'Неверный жанр.' })
  genres: EnumGenres[]; 

  @IsString()
  @IsOptional()
  img: string;

  @IsString()
  src: string;
}
