import { Body, Controller, Delete, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetArtistByIdDto } from './dto/get-artist-by-id.dto';
import { DeleteArtistDto } from './dto/delete-artist.dto';
import { ArtistService } from './artist.service';

@Controller('users')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // Получение userа по id
  @Get('id')
  @Auth()
  getByArtistId(@Body() dto: GetArtistByIdDto) {
    return this.artistService.getByArtistId(dto.artistId);
  }

  // Получение всех пользователей администратором
  @Get('/all')
  @Auth('admin')
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  // Удаление пользователя администратором
  @Delete()
  @Auth('admin')
  deleteArtist(@Body() dto: DeleteArtistDto) {
    return this.artistService.deleteArtist(dto.artistId);
  }
}
