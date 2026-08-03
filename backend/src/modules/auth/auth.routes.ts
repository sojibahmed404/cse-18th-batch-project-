import { Router } from 'express';
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
  resetPasswordSchema,
  changePasswordSchema,
  resendOTPSchema
} from './auth.schema';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/verify-otp', validate(verifyOTPSchema), authController.verifyOTP);
router.post('/set-password', validate(setPasswordSchema), authController.setPassword);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);
router.post('/resend-otp', validate(resendOTPSchema), authController.resendOTP);

// Protected routes
router.use(authenticate);
router.get('/me', authController.getMe);
router.post('/logout', logActivity('LOGOUT', 'USER'), authController.logout);
router.post('/change-password', validate(changePasswordSchema), logActivity('CHANGE_PASSWORD', 'USER'), authController.changePassword);

export default router;
