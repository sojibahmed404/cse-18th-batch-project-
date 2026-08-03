import { Request, Response, NextFunction } from 'express';
import { galleryService } from './gallery.service';
import { sendSuccess } from '../../utils/response';

export class GalleryController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await galleryService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const galleryController = new GalleryController();
