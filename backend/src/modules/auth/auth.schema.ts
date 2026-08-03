import { z } from 'zod';

const kyauEmailRegex = /^[0-9]+@(student\.)?kyau\.edu\.bd$/;

export const registerSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .refine(val => kyauEmailRegex.test(val), {
      message: 'Only KYAU education email addresses are allowed (e.g. 06224205101001@student.kyau.edu.bd)',
    }),
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
});

export const verifyOTPSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^[0-9]+$/, 'OTP must be numeric'),
});

export const setPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword'],
});

export const resendOTPSchema = z.object({
  email: z.string().email(),
});
