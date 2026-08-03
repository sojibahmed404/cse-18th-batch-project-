import { Request } from 'express';
import { Role, UserStatus } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: Role;
    status: UserStatus;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FileUploadResult {
  url: string;
  publicId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}
