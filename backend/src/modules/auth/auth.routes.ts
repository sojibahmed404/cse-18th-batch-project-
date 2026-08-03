import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authController } from './auth.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { logActivity } from '../../middleware/activity.middleware';
import {
  registerSchema,
  verifyOTPSchema,
  setPasswordSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyResetOTPSchema,
  resetPasswordSchema,
  changePasswordSchema,
  resendOTPSchema
} from './auth.schema';

const router = Router();

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many password reset requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', validate(registerSchema), authController.register);
router.post('/verify-otp', validate(verifyOTPSchema), authController.verifyOTP);
router.post('/set-password', validate(setPasswordSchema), authController.setPassword);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', resetPasswordLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/verify-reset-otp', resetPasswordLimiter, validate(verifyResetOTPSchema), authController.verifyResetOTP);
router.post('/reset-password', resetPasswordLimiter, validate(resetPasswordSchema), authController.resetPassword);
router.post('/resend-otp', validate(resendOTPSchema), authController.resendOTP);

// Protected routes
router.use(authenticate);
router.get('/me', authController.getMe);
router.post('/logout', logActivity('LOGOUT', 'USER'), authController.logout);
router.post('/change-password', validate(changePasswordSchema), logActivity('CHANGE_PASSWORD', 'USER'), authController.changePassword);

export default router;
