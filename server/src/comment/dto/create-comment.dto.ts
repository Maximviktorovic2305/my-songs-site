import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  trackId: number | string;
}
