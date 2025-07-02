import { Body, Controller, Delete, Get, Param } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ArtistService } from './artist.service';

@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // Получение userа по id
  @Get(':id')
  @Auth()
  getByArtistId(@Param('id') id: number | string) {
    return this.artistService.getByArtistId(+id);
  }

  // Получение всех пользователей администратором
  @Get()
  @Auth('admin')
  getAllArtists() {
    return this.artistService.getAllArtists();
  }

  // Удаление пользователя администратором
  @Delete(':id')
  @Auth('admin')
  deleteArtist(@Param('id') id: number | string) {
    return this.artistService.deleteArtist(+id);
  }
}
