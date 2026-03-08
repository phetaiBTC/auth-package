import { DynamicModule, Type } from '@nestjs/common';
import { PermissionService } from './interfaces/permission.interface';
export declare class AuthModule {
    static forRoot(options: {
        secret: string;
        permissionService: Type<PermissionService>;
    }): DynamicModule;
}
