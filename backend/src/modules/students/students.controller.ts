import { Request, Response, NextFunction } from 'express';
import { studentsService } from './students.service';
import { sendSuccess, parsePagination, getPaginationMeta } from '../../utils/response';
import { AuthenticatedRequest } from '../../types';

export class StudentsController {
  async getMyProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const profile = await studentsService.getMyProfile(req.user!.id);
      sendSuccess(res, 'Profile retrieved', profile);
    } catch (error) { next(error); }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const profile = await studentsService.updateProfile(req.user!.id, req.body);
      sendSuccess(res, 'Profile updated', profile);
    } catch (error) { next(error); }
  }

  async updateProfilePicture(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const profile = await studentsService.updateProfilePicture(req.user!.id, req.body.imageUrl);
      sendSuccess(res, 'Profile picture updated', profile);
    } catch (error) { next(error); }
  }

  async getAllStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = parsePagination(req.query as any);
      const search = req.query.search as string;
      const { students, total } = await studentsService.getAllStudents(page, limit, search);
      sendSuccess(res, 'Students retrieved', students, 200, getPaginationMeta(total, page, limit));
    } catch (error) { next(error); }
  }

  async getStudentByStudentId(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await studentsService.getStudentByStudentId(req.params.studentId);
      sendSuccess(res, 'Student retrieved', student);
    } catch (error) { next(error); }
  }
}

export const studentsController = new StudentsController();
