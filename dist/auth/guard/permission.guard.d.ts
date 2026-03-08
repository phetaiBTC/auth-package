import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type PermissionService } from '../interfaces/permission.interface';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private permissionService;
    constructor(reflector: Reflector, permissionService: PermissionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
