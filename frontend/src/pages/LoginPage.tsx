import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Lock,
  Eye,
  EyeOff,
  HelpCircle,
  KeyRound,
  LogIn,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

import { RootState } from '../store';
import {
  setCredentials,
  recordFailedAttempt,
  resetFailedAttempts,
  CSE18_STUDENTS
} from '../store/authSlice';
import { ForgotPasswordModal } from '../components/auth/ForgotPasswordModal';
import { NeedHelpModal } from '../components/auth/NeedHelpModal';

// Slideshow images configuration
const SLIDES = [
  {
    image: '/images/slideshow/batch_photo_1.png',
    title: 'Khwaja Yunus Ali University',
    subtitle: 'Department of Computer Science & Engineering',
    badge: 'CSE 18th Batch Systematic Squad',
    description: 'Welcome to the official 18th Batch Academic Portal. Collaborate, access coursework, track routines, and manage assignments.',
  },
  {
    image: '/images/slideshow/batch_photo_2.png',
    title: 'Advanced Computer Engineering Lab',
    subtitle: 'Research & Systematic Innovation',
    badge: 'State-of-the-Art Academic Infrastructure',
    description: 'Hands-on algorithm design, web technologies, database management, and software engineeringexcellence.',
  },
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, failedAttempts, lockedUntil } = useSelector((state: RootState) => state.auth);

  // Form State
  const [studentId, setStudentId] = useState<string>('6224205101006'); // Pre-fill default CR Sojib for convenient testing
  const [password, setPassword] = useState<string>('Password123!');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // UI State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Modals
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [showNeedHelp, setShowNeedHelp] = useState<boolean>(false);

  // Auto Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Slideshow timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Lockout calculation
  const isLockedOut = Boolean(
    lockedUntil && new Date(lockedUntil).getTime() > Date.now()
  );

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLockedOut) {
      toast.error('Account temporarily locked due to 5 failed login attempts. Please try again after 15 minutes or reset password.', {
        duration: 5000,
      });
      return;
    }

    const cleanId = studentId.trim();
    if (!cleanId || !password) {
      toast.error('Please enter your Student ID and Password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Match strictly by Student ID or Official Edu Email (<student_id>@student.kyau.edu.bd)
      const search = cleanId.toLowerCase();
      const matchedStudent = CSE18_STUDENTS.find(
        (s) =>
          s.studentId.toLowerCase() === search ||
          s.studentId.replace(/^0+/, '') === search.replace(/^0+/, '') ||
          s.email.toLowerCase() === search
      );

      if (!matchedStudent) {
        dispatch(recordFailedAttempt());
        setIsLoading(false);
        toast.error(`Invalid credentials. Attempt ${failedAttempts + 1}/5.`);
        return;
      }

      // Successful Auth
      const userPayload = {
        id: matchedStudent.studentId,
        email: matchedStudent.email,
        role: matchedStudent.role,
        status: 'ACTIVE' as const,
        isEmailVerified: true,
        createdAt: new Date().toISOString(),
        student: {
          id: `s-${matchedStudent.studentId}`,
          userId: matchedStudent.studentId,
          studentId: matchedStudent.studentId,
          firstName: matchedStudent.name.split(' ')[0] || matchedStudent.name,
          lastName: matchedStudent.name.split(' ').slice(1).join(' ') || '',
          department: 'Computer Science and Engineering',
          batch: 18,
          currentSemester: '3rd Year 1st Semester (3-1)',
          bloodGroup: (matchedStudent.bloodGroup.replace('+', '_POSITIVE').replace('-', '_NEGATIVE') || 'O_POSITIVE') as any,
          phone: matchedStudent.phone,
          address: matchedStudent.address,
        },
      };

      dispatch(resetFailedAttempts());
      dispatch(
        setCredentials({
          user: userPayload,
          token: `kyau-jwt-token-${Date.now()}`,
        })
      );

      toast.success(`Welcome back, ${matchedStudent.name}! Redirecting to Dashboard...`, {
        icon: '🎓',
        duration: 3000,
      });

      navigate('/dashboard', { replace: true });
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#071319] font-[#Outfit]">
      
      {/* =================================================================== */}
      {/* LEFT SIDE (65% Desktop): CSE 18th Batch Slideshow & University Identity */}
      {/* =================================================================== */}
      <div 
        className="relative w-full lg:w-[65%] min-h-[400px] lg:min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Slideshow Images */}
        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[8000ms] ease-out"
            />
            {/* Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071319] via-[#0B2D3B]/70 to-[#071319]/60" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#071319]/50 to-[#071319]" />
          </div>
        ))}

        {/* Top Bar Logo & Brand */}
        <div className="relative z-10 flex items-center space-x-4 animate-in fade-in duration-500">
          <div className="w-14 h-14 rounded-2xl bg-[#0B2D3B]/90 border border-emerald-400/40 p-2 shadow-xl shadow-emerald-500/10 backdrop-blur-md flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Khwaja Yunus Ali University
            </h1>
            <p className="text-xs md:text-sm font-medium text-cyan-300/90 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              Department of Computer Science & Engineering
            </p>
          </div>
        </div>

        {/* Center Content Slide Overlay Text */}
        <div className="relative z-10 my-auto py-12 space-y-5 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SLIDES[currentSlide].badge}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
            {SLIDES[currentSlide].title}
          </h2>

          <p className="text-sm md:text-base text-slate-200 leading-relaxed drop-shadow">
            {SLIDES[currentSlide].description}
          </p>

          {/* Slide Navigation Controls */}
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex items-center space-x-2">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-1 pl-4 border-l border-white/20">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Batch Copyright Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4">
          <p>© {new Date().getFullYear()} CSE 18th Batch • KYAU Academic Portal</p>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Systematic Squad Secured
          </span>
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT SIDE (35% Desktop): Modern Glassmorphism Login Card */}
      {/* =================================================================== */}
      <div className="w-full lg:w-[35%] flex items-center justify-center p-6 md:p-10 bg-[#071319] border-t lg:border-t-0 lg:border-l border-slate-800/80">
        <div className="w-full max-w-md space-y-6">
          
          {/* Card Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">Student Sign In</h2>
            <p className="text-xs text-slate-400">
              Access your CSE 18th Batch academic dashboard
            </p>
          </div>

          {/* Account Lock Warning Banner */}
          {isLockedOut && (
            <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-red-400">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Account Temporarily Locked</span>
              </div>
              <p className="text-slate-300">
                Maximum failed attempts (5/5) reached. Please wait 15 minutes or click <strong>Forgot Password</strong> to reset.
              </p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 glass-card p-6 md:p-8 rounded-2xl">
            
            {/* Student ID / Edu Email Field */}
            <div>
              <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1.5">
                Student ID / Edu Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 6224205101006"
                  className="w-full px-4 py-3 bg-slate-900/90 border border-cyan-500/30 rounded-xl text-white text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none transition-all placeholder:text-slate-500 font-mono"
                  disabled={isLoading || isLockedOut}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <KeyRound className="w-3 h-3" />
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-slate-900/90 border border-cyan-500/30 rounded-xl text-white text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none transition-all placeholder:text-slate-500"
                  disabled={isLoading || isLockedOut}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-400"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading || isLockedOut}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In to Portal</span>
                </>
              )}
            </button>
          </form>

          {/* Need Help Footer */}
          <div className="text-center">
            <button
              onClick={() => setShowNeedHelp(true)}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Need help signing in or ID verification?</span>
            </button>
          </div>

        </div>
      </div>

      {/* Forgot Password OTP Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        initialStudentId={studentId}
        onSuccessLogin={(sId, newPass) => {
          setStudentId(sId);
          if (newPass) setPassword(newPass);
          toast.success('Password updated! Click Sign In to log into your portal.');
        }}
      />

      {/* Need Support Modal */}
      <NeedHelpModal
        isOpen={showNeedHelp}
        onClose={() => setShowNeedHelp(false)}
      />

    </div>
  );
};

export default LoginPage;
