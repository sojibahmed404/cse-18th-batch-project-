const fs = require('fs');
const path = require('path');

const modules = [
  'teachers', 'semesters', 'courses', 'assignments', 'notices',
  'routines', 'events', 'gallery', 'notifications', 'analytics',
  'search', 'upload'
];

modules.forEach(mod => {
  const dir = path.join(__dirname, `src/modules/${mod}`);
  const PascalName = mod.charAt(0).toUpperCase() + mod.slice(1);
  const camelName = mod;

  const schemaContent = `import { z } from 'zod';\nexport const create${PascalName}Schema = z.object({});\nexport const update${PascalName}Schema = z.object({});\n`;
  
  const serviceContent = `import prisma from '../../config/database';\n\nexport class ${PascalName}Service {\n  async getAll() { return prisma.${mod.replace(/s$/, '')}.findMany(); }\n}\n\nexport const ${camelName}Service = new ${PascalName}Service();\n`;

  const controllerContent = `import { Request, Response, NextFunction } from 'express';\nimport { ${camelName}Service } from './${mod}.service';\nimport { sendSuccess } from '../../utils/response';\n\nexport class ${PascalName}Controller {\n  async getAll(req: Request, res: Response, next: NextFunction) {\n    try {\n      const data = await ${camelName}Service.getAll();\n      sendSuccess(res, 'Success', data);\n    } catch (error) { next(error); }\n  }\n}\n\nexport const ${camelName}Controller = new ${PascalName}Controller();\n`;

  const routeContent = `import { Router } from 'express';\nimport { ${camelName}Controller } from './${mod}.controller';\nimport { authenticate } from '../../middleware/auth.middleware';\n\nconst router = Router();\nrouter.use(authenticate);\nrouter.get('/', ${camelName}Controller.getAll);\n\nexport default router;\n`;

  fs.writeFileSync(path.join(dir, `${mod}.schema.ts`), schemaContent);
  fs.writeFileSync(path.join(dir, `${mod}.service.ts`), serviceContent);
  fs.writeFileSync(path.join(dir, `${mod}.controller.ts`), controllerContent);
  fs.writeFileSync(path.join(dir, `${mod}.routes.ts`), routeContent);
});

console.log('Remaining boilerplate modules generated.');
