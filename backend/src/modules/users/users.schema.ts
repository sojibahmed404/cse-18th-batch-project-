import { z } from 'zod';
export const addUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  role: z.enum(['STUDENT', 'CO_CR', 'CR', 'ADMIN']).default('STUDENT'),
  password: z.string().min(8),
});
export const updateRoleSchema = z.object({ role: z.enum(['STUDENT', 'CO_CR', 'CR', 'ADMIN']) });
export const updateStatusSchema = z.object({ status: z.enum(['ACTIVE', 'SUSPENDED', 'DEACTIVATED']) });
