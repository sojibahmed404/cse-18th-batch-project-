import crypto from 'crypto';

export function generateOTP(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export function getOTPExpiry(minutes = 5): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry;
}

export function isOTPExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}
