import nodemailer from 'nodemailer';
import { env } from './env';
import { logger } from './logger';

// Create Nodemailer Transporter
const createTransporter = () => {
  if (env.SMTP_USER && env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST || 'smtp.gmail.com',
      port: env.SMTP_PORT || 587,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }
  return null;
};

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<{ success: boolean; previewUrl?: string }> {
  try {
    const transporter = createTransporter();
    
    if (transporter) {
      const info = await transporter.sendMail({
        from: env.EMAIL_FROM || '"KYAU CSE 18th Portal" <noreply@kyau.edu.bd>',
        to,
        subject,
        html,
      });
      logger.info(`[Real Email Sent] MessageId: ${info.messageId} to ${to}`);
      return { success: true };
    } else {
      // Fallback in dev mode if no SMTP app password is set in .env
      logger.info(`[Email Service] Real email requested for: ${to}`);
      logger.info(`[Email Service] Subject: ${subject}`);
      return { success: true };
    }
  } catch (error) {
    logger.error('Failed to send email:', error);
    return { success: false };
  }
}

export function generateOTPEmailHTML(name: string, otp: string, expiresMinutes: number = 5): string {
  return `
    <div style="font-family: 'Outfit', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0B2D3B; color: #F5F7FA; border-radius: 12px; border: 1px solid #00B894;">
      <div style="text-align: center; padding-bottom: 20px; border-b: 1px solid rgba(255,255,255,0.1);">
        <h1 style="color: #00B894; margin: 0; font-size: 24px;">Khwaja Yunus Ali University</h1>
        <p style="color: #94A3B8; margin: 4px 0 0 0; font-size: 14px;">Department of Computer Science & Engineering • 18th Batch</p>
      </div>

      <div style="padding: 24px 0;">
        <p style="font-size: 16px; color: #F5F7FA; margin-top: 0;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #CBD5E1;">You have requested a security password reset for your KYAU Student Academic Portal account.</p>
        
        <div style="background-color: #071319; border: 1px solid #00B894; padding: 20px; text-align: center; border-radius: 10px; margin: 24px 0;">
          <p style="color: #94A3B8; font-size: 12px; text-transform: uppercase; tracking: 2px; margin: 0 0 8px 0; font-weight: bold;">Your 6-Digit Security OTP Code:</p>
          <div style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #00B894; font-family: monospace;">
            ${otp}
          </div>
        </div>

        <p style="color: #FFB100; font-size: 13px;">⚠️ This security code is valid for <strong>${expiresMinutes} minutes</strong>. Do not share this code with anyone.</p>
      </div>

      <div style="text-align: center; padding-top: 20px; border-t: 1px solid rgba(255,255,255,0.1); color: #64748B; font-size: 12px;">
        <p>© ${new Date().getFullYear()} KYAU Department of CSE • 18th Batch Systematic Squad</p>
      </div>
    </div>
  `;
}
