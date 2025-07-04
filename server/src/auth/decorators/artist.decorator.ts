import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Artist } from 'generated/prisma';

export const CurrentArtist = createParamDecorator(
  (data: keyof Artist, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);