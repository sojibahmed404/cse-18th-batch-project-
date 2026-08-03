import { Request, Response, NextFunction } from 'express';
import { searchService } from './search.service';
import { sendSuccess } from '../../utils/response';

export class SearchController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await searchService.getAll();
      sendSuccess(res, 'Success', data);
    } catch (error) { next(error); }
  }
}

export const searchController = new SearchController();
