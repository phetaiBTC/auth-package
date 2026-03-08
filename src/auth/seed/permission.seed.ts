import { IS_PUBLIC_KEY } from "../decorator/public.decorator";
import { join } from 'path';
import { readdirSync, statSync } from 'fs';
function getAllMethods(controller: any) {
  let methods: string[] = [];
  let proto = controller.prototype;

  while (proto && proto !== Object.prototype) {
    methods = methods.concat(Object.getOwnPropertyNames(proto));
    proto = Object.getPrototypeOf(proto);
  }

  return Array.from(new Set(methods)).filter((m) => m !== 'constructor');
}

// generate permissions จาก controller
export function generatePermissions(controller: any): { code: string }[] {
  const methods = getAllMethods(controller);
  const controllerName = controller.name
    .replace('Controller', '')
    .toLowerCase();

  return methods.reduce<{ code: string }[]>((acc, methodName) => {
    const proto = controller.prototype;
    const method =
      proto[methodName] ?? Object.getPrototypeOf(proto)[methodName];
    const isPublic = Reflect.getMetadata(IS_PUBLIC_KEY, method);
    if (!isPublic) {
      acc.push({ code: `${controllerName}-${methodName}` });
    }
    return acc;
  }, []);
}

// auto-import controllers จาก folder
export function importControllers(folderPath: string): any[] {
  const controllers: any[] = [];

  const files = readdirSync(folderPath);
  files.forEach((file) => {
    const fullPath = join(folderPath, file);
    if (statSync(fullPath).isDirectory()) {
      controllers.push(...importControllers(fullPath));
    } else if (
      file.endsWith('.controller.ts') ||
      file.endsWith('.controller.js')
    ) {
      const moduleExports = require(fullPath);

      // รองรับ default export
      if (moduleExports.default) {
        controllers.push(moduleExports.default);
      }

      // รองรับ named export
      Object.values(moduleExports).forEach((exp) => {
        if (typeof exp === 'function' && exp.name.endsWith('Controller')) {
          controllers.push(exp);
        }
      });
    }
  });

  return controllers;
}