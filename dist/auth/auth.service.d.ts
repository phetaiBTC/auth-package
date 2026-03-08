import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    signToken(payload: JwtPayload): string;
    verifyToken(token: string): any;
}
