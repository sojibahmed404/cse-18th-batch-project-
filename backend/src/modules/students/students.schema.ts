import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(1).optional(),
  personalEmail: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  bloodGroup: z.enum([
    'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE',
    'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'UNKNOWN'
  ]).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  github: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  bio: z.string().max(500).optional(),
});

export const updateProfilePictureSchema = z.object({
  imageUrl: z.string().url(),
});
