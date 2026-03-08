import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { PERMISSION_SERVICE } from '../constants/auth.constants';
import { type PermissionService } from '../interfaces/permission.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PERMISSION_SERVICE)
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const handlerName = context.getHandler().name;
    const controllerName = context
      .getClass()
      .name.replace('Controller', '')
      .toLowerCase();
    const permissionKey = `${controllerName}-${handlerName}`;

    // return user?.permissions?.includes(permissionKey);
    const { permissions } = await this.permissionService.getPermissions(
      user.sub,
    );
    return permissions.includes(permissionKey);
  }
}
