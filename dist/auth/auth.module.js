"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./serive/auth.service");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const auth_constants_1 = require("./constants/auth.constants");
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot(options) {
        return {
            module: AuthModule_1,
            imports: [
                jwt_1.JwtModule.register({
                    secret: options.secret,
                    signOptions: { expiresIn: '7d' },
                }),
            ],
            providers: [
                {
                    provide: auth_constants_1.AUTH_OPTIONS,
                    useValue: options,
                },
                {
                    provide: auth_constants_1.PERMISSION_SERVICE,
                    useClass: options.permissionService,
                },
                auth_service_1.AuthService,
                jwt_strategy_1.JwtStrategy,
            ],
            exports: [auth_service_1.AuthService, auth_constants_1.PERMISSION_SERVICE],
        };
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], AuthModule);
//# sourceMappingURL=auth.module.js.map