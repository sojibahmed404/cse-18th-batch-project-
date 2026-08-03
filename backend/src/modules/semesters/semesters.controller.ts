import { Request, Response, NextFunction } from 'express';
import { semestersService } from './semesters.service';
import { sendSuccess } from '../../utils/response';

export class SemestersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await semestersService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const semestersController = new SemestersController();
