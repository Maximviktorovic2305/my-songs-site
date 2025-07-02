import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { TrackModule } from './track/track.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ArtistModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TrackModule,
    CommentModule,
  ],
})
export class AppModule {}
