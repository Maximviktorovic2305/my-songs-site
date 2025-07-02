import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ArtistModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
