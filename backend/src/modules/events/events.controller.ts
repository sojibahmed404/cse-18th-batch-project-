import { Request, Response, NextFunction } from 'express';
import { eventsService } from './events.service';
import { sendSuccess } from '../../utils/response';

export class EventsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await eventsService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const eventsController = new EventsController();
