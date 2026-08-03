import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import prisma from '../config/database';

export function logActivity(action: string, resource: string) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    res.on('finish', async () => {
      if (req.user && res.statusCode < 400) {
        try {
          await prisma.activityLog.create({
            data: {
              userId: req.user!.id,
              action,
              resource,
              resourceId: req.params.id,
              ipAddress: req.ip,
              details: JSON.stringify({
                method: req.method,
                path: req.path,
                statusCode: res.statusCode,
              }),
            },
          });
        } catch {
        }
      }
    });
    next();
  };
}
