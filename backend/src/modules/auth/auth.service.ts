import { Prisma } from '@prisma/client';
import prisma from '../../config/database';
import { generateOTP, getOTPExpiry, isOTPExpired } from '../../utils/otp';
import { hashPassword, comparePassword, validatePasswordStrength } from '../../utils/password';
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiry, verifyRefreshToken } from '../../utils/jwt';
import { sendEmail, generateOTPEmailHTML } from '../../config/email';
import { env } from '../../config/env';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../../config/logger';

export class AuthService {
  async register(email: string, firstName: string, lastName: string) {
    // Validate KYAU email
    const kyauEmailRegex = /^[0-9]+@(student\.)?kyau\.edu\.bd$/;
    if (!kyauEmailRegex.test(email)) {
      throw new Error('Only KYAU education email addresses are allowed');
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      if (existingUser.isEmailVerified) {
        throw Object.assign(new Error('Email already registered'), { statusCode: 409 });
      }
      // Resend OTP if not verified yet
      return this.sendOTP(existingUser.id, email, `${firstName} ${lastName}`);
    }

    // Extract student ID from email
    const studentId = email.split('@')[0];

    // Create user + student profile in transaction
    const user = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password: '', // Will be set after OTP verification
          role: 'STUDENT',
          status: 'PENDING',
          isEmailVerified: false,
        },
      });

      await tx.student.create({
        data: {
          userId: newUser.id,
          studentId,
          firstName,
          lastName,
          department: env.DEPARTMENT_NAME,
          batch: env.BATCH_NUMBER,
          currentSemester: '1-1',
        },
      });

      return newUser;
    });

    return this.sendOTP(user.id, email, `${firstName} ${lastName}`);
  }

  private async sendOTP(userId: string, email: string, name: string) {
    // Delete any existing OTPs for this user
    await prisma.emailVerification.updateMany({
      where: { userId, isUsed: false },
      data: { isUsed: true },
    });

    const otp = generateOTP();
    const expiresAt = getOTPExpiry(env.OTP_EXPIRES_MINUTES);

    await prisma.emailVerification.create({
      data: { userId, email, otp, expiresAt },
    });

    // Send OTP email
    const emailSent = await sendEmail({
      to: email,
      subject: `Your OTP for CSE 18th Batch Portal: ${otp}`,
      html: generateOTPEmailHTML(name, otp),
    });

    logger.info(`OTP sent to ${email} (sent=${emailSent})`);
    // In dev mode, always log OTP
    if (env.NODE_ENV === 'development') {
      logger.info(`[DEV] OTP for ${email}: ${otp}`);
    }

    return { message: 'OTP sent to your email address', email };
  }

  async verifyOTP(email: string, otp: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

    const verification = await prisma.emailVerification.findFirst({
      where: { userId: user.id, isUsed: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!verification) throw Object.assign(new Error('No OTP found. Please request a new one.'), { statusCode: 400 });
    if (isOTPExpired(verification.expiresAt)) throw Object.assign(new Error('OTP has expired. Please request a new one.'), { statusCode: 400 });
    if (verification.attempts >= env.OTP_MAX_ATTEMPTS) throw Object.assign(new Error('Too many attempts. Please request a new OTP.'), { statusCode: 429 });
    
    if (verification.otp !== otp) {
      await prisma.emailVerification.update({
        where: { id: verification.id },
        data: { attempts: { increment: 1 } },
      });
      throw Object.assign(new Error('Invalid OTP'), { statusCode: 400 });
    }

    // Mark OTP as used
    await prisma.emailVerification.update({
      where: { id: verification.id },
      data: { isUsed: true },
    });

    return { message: 'Email verified successfully', email };
  }

  async setPassword(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

    const { isValid, message } = validatePasswordStrength(password);
    if (!isValid) throw Object.assign(new Error(message), { statusCode: 400 });

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        isEmailVerified: true,
        status: 'ACTIVE',
      },
    });

    return { message: 'Password set successfully. You can now log in.' };
  }

  async login(email: string, password: string, ipAddress?: string, userAgent?: string) {
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
      include: { student: true },
    });

    const logLogin = async (success: boolean) => {
      if (user) {
        await prisma.loginLog.create({
          data: {
            userId: user.id,
            ipAddress,
            userAgent,
            device: userAgent?.includes('Mobile') ? 'Mobile' : 'Desktop',
            browser: userAgent?.split(' ')[0] || 'Unknown',
            success,
          },
        }).catch(() => {});
      }
    };

    if (!user) {
      throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
    }

    // Check account lock
    if (user.lockedUntil && new Date() < user.lockedUntil) {
      const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
      throw Object.assign(new Error(`Account locked. Try again in ${minutesLeft} minutes.`), { statusCode: 423 });
    }

    if (!user.isEmailVerified) throw Object.assign(new Error('Please verify your email first'), { statusCode: 403 });
    if (user.status === 'SUSPENDED') throw Object.assign(new Error('Your account has been suspended. Contact admin.'), { statusCode: 403 });
    if (user.status === 'DEACTIVATED') throw Object.assign(new Error('Account deactivated.'), { statusCode: 403 });

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      const attempts = user.loginAttempts + 1;
      const lockedUntil = attempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null;
      await prisma.user.update({
        where: { id: user.id },
        data: { loginAttempts: attempts, lockedUntil },
      });
      await logLogin(false);
      throw Object.assign(new Error('Invalid email or password'), { statusCode: 401 });
    }

    // Reset login attempts
    await prisma.user.update({
      where: { id: user.id },
      data: { loginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
    });
    await logLogin(true);

    const tokenPayload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);
    const expiresAt = getRefreshTokenExpiry();

    await prisma.refreshToken.create({
      data: { userId: user.id, token: refreshToken, expiresAt },
    });

    const { password: _pwd, ...userWithoutPassword } = user;
    return { accessToken, refreshToken, user: userWithoutPassword };
  }

  async refreshToken(token: string) {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!storedToken || storedToken.isRevoked || new Date() > storedToken.expiresAt) {
      throw Object.assign(new Error('Invalid or expired refresh token'), { statusCode: 401 });
    }

    // Rotate refresh token
    await prisma.refreshToken.update({ where: { id: storedToken.id }, data: { isRevoked: true } });

    const tokenPayload = { userId: storedToken.user.id, email: storedToken.user.email, role: storedToken.user.role };
    const newAccessToken = generateAccessToken(tokenPayload);
    const newRefreshToken = generateRefreshToken(tokenPayload);
    const expiresAt = getRefreshTokenExpiry();

    await prisma.refreshToken.create({
      data: { userId: storedToken.userId, token: newRefreshToken, expiresAt },
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      await prisma.refreshToken.updateMany({
        where: { userId, token: refreshToken },
        data: { isRevoked: true },
      });
    } else {
      // Revoke all refresh tokens
      await prisma.refreshToken.updateMany({
        where: { userId },
        data: { isRevoked: true },
      });
    }
    return { message: 'Logged out successfully' };
  }

  async forgotPassword(input: string) {
    const cleanInput = input.trim().toLowerCase();
    const studentIdClean = cleanInput.replace(/^0+/, '');

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanInput },
          { student: { studentId: cleanInput } },
          { student: { studentId: studentIdClean } },
          { student: { personalEmail: cleanInput } },
        ],
      },
      include: { student: true },
    });

    if (!user) {
      throw Object.assign(
        new Error('No registered account found with this Email or Student ID. Please check your input.'),
        { statusCode: 404 }
      );
    }

    const targetEmail = user.email;

    // Invalidate existing unused password resets
    await prisma.passwordReset.updateMany({
      where: { userId: user.id, isUsed: false },
      data: { isUsed: true },
    });

    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes session expiry

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        otp,
        otpExpiresAt,
        attempts: 0,
        isOtpVerified: false,
        expiresAt,
      },
    });

    const name = user.student ? `${user.student.firstName} ${user.student.lastName}` : 'Student';
    const emailSent = await sendEmail({
      to: targetEmail,
      subject: `Your Password Reset OTP Code: ${otp} - CSE 18th Batch Portal`,
      html: generateOTPEmailHTML(name, otp),
    });

    logger.info(`Password reset OTP sent to ${targetEmail} (sent=${emailSent})`);
    if (env.NODE_ENV === 'development') {
      logger.info(`[DEV] Password Reset OTP for ${targetEmail}: ${otp}`);
    }

    return {
      message: `6-digit OTP code sent to ${targetEmail}`,
      email: targetEmail,
      devOtp: env.NODE_ENV === 'development' ? otp : undefined,
    };
  }

  async verifyResetOTP(input: string, otp: string) {
    const cleanInput = input.trim().toLowerCase();
    const studentIdClean = cleanInput.replace(/^0+/, '');

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanInput },
          { student: { studentId: cleanInput } },
          { student: { studentId: studentIdClean } },
          { student: { personalEmail: cleanInput } },
        ],
      },
    });

    if (!user) {
      throw Object.assign(new Error('User not found'), { statusCode: 404 });
    }

    const resetRecord = await prisma.passwordReset.findFirst({
      where: { userId: user.id, isUsed: false, isOtpVerified: false },
      orderBy: { createdAt: 'desc' },
    });

    if (!resetRecord || !resetRecord.otp || !resetRecord.otpExpiresAt) {
      throw Object.assign(new Error('No active password reset OTP found. Please request a new one.'), { statusCode: 400 });
    }

    if (new Date() > resetRecord.otpExpiresAt) {
      throw Object.assign(new Error('OTP code has expired (5-minute limit). Please request a new one.'), { statusCode: 400 });
    }

    if (resetRecord.attempts >= 5) {
      throw Object.assign(new Error('Maximum 5 incorrect attempts reached. Please request a new OTP.'), { statusCode: 429 });
    }

    if (resetRecord.otp !== otp) {
      const nextAttempts = resetRecord.attempts + 1;
      await prisma.passwordReset.update({
        where: { id: resetRecord.id },
        data: { attempts: nextAttempts },
      });

      const remaining = 5 - nextAttempts;
      const errorMsg = remaining > 0 
        ? `Invalid OTP code. You have ${remaining} attempt(s) remaining.`
        : `Invalid OTP code. Maximum 5 incorrect attempts reached. Please request a new OTP.`;
      
      throw Object.assign(new Error(errorMsg), { statusCode: remaining > 0 ? 400 : 429 });
    }

    // OTP matched! Generate single-use resetToken
    const resetToken = uuidv4();
    await prisma.passwordReset.update({
      where: { id: resetRecord.id },
      data: {
        isOtpVerified: true,
        resetToken,
      },
    });

    return { message: 'OTP verified successfully.', resetToken };
  }

  async resetPassword(token: string, password: string) {
    const reset = await prisma.passwordReset.findFirst({
      where: { resetToken: token, isUsed: false, isOtpVerified: true },
      include: { user: true },
    });

    if (!reset || new Date() > reset.expiresAt) {
      throw Object.assign(new Error('Invalid or expired password reset session. Please request a new OTP.'), { statusCode: 400 });
    }

    const { isValid, message } = validatePasswordStrength(password);
    if (!isValid) throw Object.assign(new Error(message), { statusCode: 400 });

    const hashedPassword = await hashPassword(password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: reset.userId },
        data: { password: hashedPassword, loginAttempts: 0, lockedUntil: null },
      }),
      prisma.passwordReset.update({
        where: { id: reset.id },
        data: { isUsed: true },
      }),
      prisma.refreshToken.updateMany({
        where: { userId: reset.userId },
        data: { isRevoked: true },
      }),
      prisma.activityLog.create({
        data: {
          userId: reset.userId,
          action: 'PASSWORD_RESET',
          resource: 'user',
          resourceId: reset.userId,
          details: 'Password reset completed via Gmail OTP authentication',
        },
      }),
    ]);

    return { message: 'Password updated successfully. You can now log in with your new password.' };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) throw Object.assign(new Error('Current password is incorrect'), { statusCode: 400 });

    const { isValid: isStrong, message } = validatePasswordStrength(newPassword);
    if (!isStrong) throw Object.assign(new Error(message), { statusCode: 400 });

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Revoke all refresh tokens to force re-login
    await prisma.refreshToken.updateMany({
      where: { userId },
      data: { isRevoked: true },
    });

    return { message: 'Password changed successfully. Please log in again.' };
  }

  async resendOTP(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { student: true },
    });
    if (!user) throw Object.assign(new Error('Email not found'), { statusCode: 404 });
    if (user.isEmailVerified) throw Object.assign(new Error('Email already verified'), { statusCode: 400 });

    const name = user.student ? `${user.student.firstName} ${user.student.lastName}` : 'Student';
    return this.sendOTP(user.id, email, name);
  }
}

export const authService = new AuthService();
