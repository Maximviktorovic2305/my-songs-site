import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentArtist = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const artist = request.user?.artist;
    if (!artist) {
      return undefined;
    }
    if (data) {
      return artist[data];
    }
    return artist;
  },
);
