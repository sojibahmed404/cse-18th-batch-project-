import { Request, Response, NextFunction } from 'express';
import { coursesService } from './courses.service';
import { sendSuccess } from '../../utils/response';

export class CoursesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await coursesService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const coursesController = new CoursesController();
