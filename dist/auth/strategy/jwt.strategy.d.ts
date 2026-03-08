import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private options;
    constructor(options: {
        secret: string;
    });
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
