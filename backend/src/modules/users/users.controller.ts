import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { sendSuccess, parsePagination, getPaginationMeta } from '../../utils/response';

export class UsersController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = parsePagination(req.query as any);
      const search = req.query.search as string;
      const role = req.query.role as string;
      const status = req.query.status as string;

      const { users, total } = await usersService.getAllUsers(page, limit, search, role, status);
      sendSuccess(res, 'Users retrieved', users, 200, getPaginationMeta(total, page, limit));
    } catch (error) { next(error); }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.getUserById(req.params.id);
      sendSuccess(res, 'User retrieved', user);
    } catch (error) { next(error); }
  }

  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.createUser(req.body);
      sendSuccess(res, 'User created', user, 201);
    } catch (error) { next(error); }
  }

  async updateUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.updateUserRole(req.params.id, req.body.role);
      sendSuccess(res, 'Role updated', user);
    } catch (error) { next(error); }
  }

  async updateUserStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.updateUserStatus(req.params.id, req.body.status);
      sendSuccess(res, 'Status updated', user);
    } catch (error) { next(error); }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await usersService.deleteUser(req.params.id);
      sendSuccess(res, 'User deleted');
    } catch (error) { next(error); }
  }

  async getLoginHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = parsePagination(req.query as any);
      const { logs, total } = await usersService.getLoginHistory(req.params.id, page, limit);
      sendSuccess(res, 'Login history retrieved', logs, 200, getPaginationMeta(total, page, limit));
    } catch (error) { next(error); }
  }

  async getActivityLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = parsePagination(req.query as any);
      const { logs, total } = await usersService.getActivityLogs(req.params.id, page, limit);
      sendSuccess(res, 'Activity logs retrieved', logs, 200, getPaginationMeta(total, page, limit));
    } catch (error) { next(error); }
  }
}

export const usersController = new UsersController();
