import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { PrismaService } from 'src/prisma.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
})
export class TrackModule {}
