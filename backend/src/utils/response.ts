import { Response } from 'express';
import { ApiResponse, PaginationMeta } from '../types';

export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode = 200,
  pagination?: PaginationMeta
): Response {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    pagination,
  };
  return res.status(statusCode).json(response);
}

export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  error?: string
): Response {
  const response: ApiResponse = {
    success: false,
    message,
    error,
  };
  return res.status(statusCode).json(response);
}

export function getPaginationMeta(
  total: number,
  page: number,
  limit: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export function parsePagination(query: Record<string, string | undefined>): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(1, parseInt(query.page || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(query.limit || '20', 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
