import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess, sendError } from '../../utils/response';
import { AuthenticatedRequest } from '../../types';
import prisma from '../../config/database';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, firstName, lastName } = req.body;
      const result = await authService.register(email, firstName, lastName);
      sendSuccess(res, result.message, { email: result.email }, 201);
    } catch (error) { next(error); }
  }

  async verifyOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyOTP(email, otp);
      sendSuccess(res, result.message, { email: result.email });
    } catch (error) { next(error); }
  }

  async setPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.setPassword(email, password);
      sendSuccess(res, result.message);
    } catch (error) { next(error); }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.headers['user-agent'];
      const result = await authService.login(email, password, ipAddress, userAgent);
      // Set refresh token in httpOnly cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      sendSuccess(res, 'Login successful', {
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error) { next(error); }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken || req.body?.refreshToken;
      if (!token) { sendError(res, 'Refresh token required', 401); return; }
      const result = await authService.refreshToken(token);
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      sendSuccess(res, 'Token refreshed', { accessToken: result.accessToken });
    } catch (error) { next(error); }
  }

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      await authService.logout(req.user!.id, refreshToken);
      res.clearCookie('refreshToken');
      sendSuccess(res, 'Logged out successfully');
    } catch (error) { next(error); }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = await authService.forgotPassword(email);
      sendSuccess(res, result.message, { email: result.email });
    } catch (error) { next(error); }
  }

  async verifyResetOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const result = await authService.verifyResetOTP(email, otp);
      sendSuccess(res, result.message, { resetToken: result.resetToken });
    } catch (error) { next(error); }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      const result = await authService.resetPassword(token, password);
      sendSuccess(res, result.message);
    } catch (error) { next(error); }
  }

  async changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body;
      const result = await authService.changePassword(req.user!.id, currentPassword, newPassword);
      res.clearCookie('refreshToken');
      sendSuccess(res, result.message);
    } catch (error) { next(error); }
  }

  async resendOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const result = await authService.resendOTP(email);
      sendSuccess(res, result.message);
    } catch (error) { next(error); }
  }

  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true, email: true, role: true, status: true,
          isEmailVerified: true, lastLoginAt: true, createdAt: true,
          student: true,
        },
      });
      sendSuccess(res, 'User retrieved', user);
    } catch (error) { next(error); }
  }
}

export const authController = new AuthController();
