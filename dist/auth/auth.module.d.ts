import { DynamicModule } from '@nestjs/common';
export declare class AuthModule {
    static forRoot(options: {
        secret: string;
    }): DynamicModule;
}
