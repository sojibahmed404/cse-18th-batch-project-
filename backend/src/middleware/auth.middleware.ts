import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { verifyAccessToken } from '../utils/jwt';
import prisma from '../config/database';
import { sendError } from '../utils/response';
import { Role } from '@prisma/client';

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      sendError(res, 'Access token required', 401, 'UNAUTHORIZED');
      return;
    }

    const decoded = verifyAccessToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId, deletedAt: null },
      select: { id: true, email: true, role: true, status: true },
    });

    if (!user) {
      sendError(res, 'User not found', 401, 'UNAUTHORIZED');
      return;
    }

    if (user.status === 'SUSPENDED') {
      sendError(res, 'Your account has been suspended. Contact admin.', 403, 'SUSPENDED');
      return;
    }

    if (user.status === 'PENDING') {
      sendError(res, 'Please verify your email first.', 403, 'EMAIL_NOT_VERIFIED');
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    sendError(res, 'Invalid or expired token', 401, 'TOKEN_EXPIRED');
  }
}

export function authorize(...roles: Role[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');
      return;
    }

    if (!roles.includes(req.user.role)) {
      sendError(
        res,
        `Access denied. Required role: ${roles.join(' or ')}`,
        403,
        'FORBIDDEN'
      );
      return;
    }

    next();
  };
}

export function requireCROrAbove(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');
    return;
  }
  const allowed: Role[] = ['CR', 'ADMIN'];
  if (!allowed.includes(req.user.role)) {
    sendError(res, 'CR or Admin access required', 403, 'FORBIDDEN');
    return;
  }
  next();
}

export function requireCoCROrAbove(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    sendError(res, 'Unauthorized', 401, 'UNAUTHORIZED');
    return;
  }
  const allowed: Role[] = ['CO_CR', 'CR', 'ADMIN'];
  if (!allowed.includes(req.user.role)) {
    sendError(res, 'Co-CR, CR, or Admin access required', 403, 'FORBIDDEN');
    return;
  }
  next();
}
