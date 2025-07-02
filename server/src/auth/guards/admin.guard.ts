import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Artist } from 'generated/prisma';
import { Observable } from 'rxjs';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<{ user: Artist }>();

    const user = request.user;

    if (user.role !== 'admin')
      throw new ForbiddenException('Только для администратора');

    return true;
  }
}
