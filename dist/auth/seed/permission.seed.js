"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePermissions = generatePermissions;
exports.importControllers = importControllers;
const public_decorator_1 = require("../decorator/public.decorator");
const path_1 = require("path");
const fs_1 = require("fs");
function getAllMethods(controller) {
    let methods = [];
    let proto = controller.prototype;
    while (proto && proto !== Object.prototype) {
        methods = methods.concat(Object.getOwnPropertyNames(proto));
        proto = Object.getPrototypeOf(proto);
    }
    return Array.from(new Set(methods)).filter((m) => m !== 'constructor');
}
function generatePermissions(controller) {
    const methods = getAllMethods(controller);
    const controllerName = controller.name
        .replace('Controller', '')
        .toLowerCase();
    return methods.reduce((acc, methodName) => {
        const proto = controller.prototype;
        const method = proto[methodName] ?? Object.getPrototypeOf(proto)[methodName];
        const isPublic = Reflect.getMetadata(public_decorator_1.IS_PUBLIC_KEY, method);
        if (!isPublic) {
            acc.push({ code: `${controllerName}-${methodName}` });
        }
        return acc;
    }, []);
}
function importControllers(folderPath) {
    const controllers = [];
    const files = (0, fs_1.readdirSync)(folderPath);
    files.forEach((file) => {
        const fullPath = (0, path_1.join)(folderPath, file);
        if ((0, fs_1.statSync)(fullPath).isDirectory()) {
            controllers.push(...importControllers(fullPath));
        }
        else if (file.endsWith('.controller.ts') ||
            file.endsWith('.controller.js')) {
            const moduleExports = require(fullPath);
            if (moduleExports.default) {
                controllers.push(moduleExports.default);
            }
            Object.values(moduleExports).forEach((exp) => {
                if (typeof exp === 'function' && exp.name.endsWith('Controller')) {
                    controllers.push(exp);
                }
            });
        }
    });
    return controllers;
}
//# sourceMappingURL=permission.seed.js.map