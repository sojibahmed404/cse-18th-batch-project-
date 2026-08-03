import { Request, Response, NextFunction } from 'express';
import { routinesService } from './routines.service';
import { sendSuccess } from '../../utils/response';

export class RoutinesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await routinesService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const routinesController = new RoutinesController();
