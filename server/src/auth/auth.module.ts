import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { getJwtConfig } from 'src/config/jwt.config';
import { ArtistService } from 'src/artist/artist.service';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ConfigModule,
    ArtistModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, ArtistService],
})
export class AuthModule {}
