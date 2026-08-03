import { Request, Response, NextFunction } from 'express';
import { assignmentsService } from './assignments.service';
import { sendSuccess } from '../../utils/response';

export class AssignmentsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await assignmentsService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const assignmentsController = new AssignmentsController();
