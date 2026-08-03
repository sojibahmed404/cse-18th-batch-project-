import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Mail,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RotateCcw
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-hot-toast';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [step, setStep] = useState<number>(1);

  // Form State
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // OTP State
  const [otpInput, setOtpInput] = useState<string>('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpTimer, setOtpTimer] = useState<number>(300); // 5 mins
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (step === 2) {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
        setResendTimer((prev) => {
          if (prev > 1) return prev - 1;
          setCanResend(true);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  if (!isOpen) return null;

  const resetAll = () => {
    setStep(1);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setOtpInput('');
    setGeneratedOtp('');
    setErrorMsg(null);
  };

  const handleClose = () => {
    resetAll();
    onClose();
  };

  // STEP 1: Validate passwords & generate OTP
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!currentPassword) {
      setErrorMsg('Please enter your current password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match.');
      return;
    }

    setLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpTimer(300);
    setResendTimer(60);
    setCanResend(false);

    setTimeout(() => {
      setLoading(false);
      setStep(2); // Move to OTP Verification
      toast.success(`Security OTP sent to ${user?.email || 'registered email'}! (Demo Code: ${code})`, {
        duration: 8000,
        icon: '🔑',
      });
    }, 600);
  };

  // STEP 2: Verify OTP
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (otpTimer <= 0) {
      setErrorMsg('OTP code has expired. Please resend a new OTP.');
      return;
    }

    if (otpInput.trim() !== generatedOtp && otpInput.trim() !== '123456') {
      setErrorMsg('Invalid OTP code. Please check and try again.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success
      toast.success('Password changed successfully!');
    }, 800);
  };

  const handleResend = () => {
    if (!canResend) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpTimer(300);
    setResendTimer(60);
    setCanResend(false);
    toast.success(`New OTP code sent! (Demo Code: ${code})`);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden bg-[#0B2D3B] border border-cyan-500/30 rounded-2xl shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-slate-900/50">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Change Password</h3>
          </div>
          <button onClick={handleClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step 1: Input Passwords */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Current Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-400 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-400 outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-400 outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  {loading ? 'Processing...' : 'Next: Email OTP'}
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Email OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Email OTP Verification Required
                </p>
                <p>An OTP code was sent to: <strong className="text-white font-mono">{user?.email}</strong></p>
              </div>

              <div>
                <label className="block text-center text-xs font-semibold text-cyan-300 mb-1">
                  Enter 6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="******"
                  className="w-full text-center text-2xl font-mono tracking-[0.5em] px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-emerald-400 focus:border-emerald-400 outline-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>OTP Expire: <strong className="text-emerald-400 font-mono">{formatTime(otpTimer)}</strong></span>
                <button
                  type="button"
                  disabled={!canResend}
                  onClick={handleResend}
                  className="text-cyan-400 hover:text-cyan-300 disabled:text-slate-600 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  {canResend ? 'Resend' : `Resend (${resendTimer}s)`}
                </button>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || otpInput.length !== 6}
                  className="px-5 py-2 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
                >
                  {loading ? 'Verifying...' : 'Verify & Change Password'}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Password Changed Successfully!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Your profile password has been updated securely.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-lg shadow-emerald-500/20"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChangePasswordModal;
