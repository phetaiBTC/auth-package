import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

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
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
    };
  }
}
