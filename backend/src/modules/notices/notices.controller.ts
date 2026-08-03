import { Request, Response, NextFunction } from 'express';
import { noticesService } from './notices.service';
import { sendSuccess } from '../../utils/response';

export class NoticesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await noticesService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const noticesController = new NoticesController();
