import { Request, Response, NextFunction } from 'express';
import { teachersService } from './teachers.service';
import { sendSuccess } from '../../utils/response';

export class TeachersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await teachersService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const teachersController = new TeachersController();
