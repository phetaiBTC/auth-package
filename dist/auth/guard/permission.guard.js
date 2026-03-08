"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const public_decorator_1 = require("../decorator/public.decorator");
const auth_constants_1 = require("../constants/auth.constants");
let PermissionGuard = class PermissionGuard {
    reflector;
    permissionService;
    constructor(reflector, permissionService) {
        this.reflector = reflector;
        this.permissionService = permissionService;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const handlerName = context.getHandler().name;
        const controllerName = context
            .getClass()
            .name.replace('Controller', '')
            .toLowerCase();
        const permissionKey = `${controllerName}-${handlerName}`;
        const { permissions } = await this.permissionService.getPermissions(user.sub);
        return permissions.includes(permissionKey);
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(auth_constants_1.PERMISSION_SERVICE)),
    __metadata("design:paramtypes", [core_1.Reflector, Object])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map