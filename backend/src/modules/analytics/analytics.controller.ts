import { Request, Response, NextFunction } from 'express';
import { analyticsService } from './analytics.service';
import { sendSuccess } from '../../utils/response';

export class AnalyticsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const analyticsController = new AnalyticsController();
