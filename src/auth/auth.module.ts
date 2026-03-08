import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AUTH_OPTIONS } from './constants/auth.constants';

@Module({})
export class AuthModule {
  static forRoot(options: { secret: string }): DynamicModule {
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
        AuthService,
        JwtStrategy,
      ],
      exports: [AuthService],
    };
  }
}
