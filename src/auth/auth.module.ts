import { DynamicModule, Global, Module, Type } from '@nestjs/common';
import { AuthService } from './serive/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AUTH_OPTIONS, PERMISSION_SERVICE } from './constants/auth.constants';
import { PermissionService } from './interfaces/permission.interface';
@Global()
@Module({})
export class AuthModule {
  static forRoot(options: {
    secret: string;
    permissionService: Type<PermissionService>;
  }): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        JwtModule.register({
          secret: options.secret,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [
        {
          provide: AUTH_OPTIONS,
          useValue: options,
        },
        {
          provide: PERMISSION_SERVICE,
          useClass: options.permissionService,
        },
        AuthService,
        JwtStrategy,
      ],
      exports: [AuthService,PERMISSION_SERVICE],
    };
  }
}
