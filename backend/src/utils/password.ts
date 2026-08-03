import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): {
  isValid: boolean;
  message: string;
} {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!minLength) return { isValid: false, message: 'Password must be at least 8 characters long' };
  if (!hasUppercase) return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  if (!hasLowercase) return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  if (!hasNumber) return { isValid: false, message: 'Password must contain at least one number' };
  if (!hasSpecial) return { isValid: false, message: 'Password must contain at least one special character' };

  return { isValid: true, message: 'Password is strong' };
}
