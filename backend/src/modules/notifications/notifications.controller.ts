import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { sendSuccess } from '../../utils/response';

export class NotificationsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await notificationsService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const notificationsController = new NotificationsController();
