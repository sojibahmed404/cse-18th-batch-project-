import { Request, Response, NextFunction } from 'express';
import { uploadService } from './upload.service';
import { sendSuccess } from '../../utils/response';

export class UploadController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await uploadService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const uploadController = new UploadController();
