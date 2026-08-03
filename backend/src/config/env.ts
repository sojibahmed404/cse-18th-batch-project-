import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_URL: z.string().default('http://localhost:5173'),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default('CSE 18th Batch Portal <noreply@kyau.edu.bd>'),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  ADMIN_EMAIL: z.string().email().default('admin@kyau.edu.bd'),
  ADMIN_PASSWORD: z.string().default('Admin@12345'),
  ADMIN_NAME: z.string().default('System Administrator'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),
  OTP_EXPIRES_MINUTES: z.coerce.number().default(5),
  OTP_MAX_ATTEMPTS: z.coerce.number().default(3),
  COOKIE_SECRET: z.string().default('cookie_secret'),
  APP_NAME: z.string().default('CSE 18th Batch Portal'),
  APP_URL: z.string().default('http://localhost:5000'),
  UNIVERSITY_NAME: z.string().default('Khwaja Yunus Ali University'),
  DEPARTMENT_NAME: z.string().default('Computer Science and Engineering'),
  BATCH_NUMBER: z.coerce.number().default(18),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
