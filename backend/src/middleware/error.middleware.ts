import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { Prisma } from '@prisma/client';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(`${req.method} ${req.path} - ${err.message}`, err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ success: false, message: err.message || 'Internal server error' });
}

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
}
