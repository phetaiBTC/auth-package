import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { PERMISSION_KEY } from '../decorator/permission.decorator';
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

    const permissionKey = this.reflector.getAllAndOverride<string>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    // ไม่ได้ระบุ @Permission() => แค่ผ่าน authentication ก็พอ
    if (!permissionKey) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const { permissions } = await this.permissionService.getPermissions(
      user.sub,
    );
    if (!permissions.includes(permissionKey)) {
      throw new ForbiddenException(`You don't have access to ${permissionKey}`);
    }
    return true;
  }
}
