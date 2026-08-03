import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  MapPin,
  Shield,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  KeyRound,
  Download,
  Edit3,
  LogOut,
  Sparkles,
  FileText,
  Lock,
  Layers,
  History,
  Camera
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { LoginHistoryModal } from '../components/profile/LoginHistoryModal';
import { ChangeAvatarModal } from '../components/profile/ChangeAvatarModal';
import { ForgotPasswordModal } from '../components/auth/ForgotPasswordModal';
import { Avatar } from '../components/ui/Avatar';

export function ProfilePage() {
  const { user, logout } = useAuth();

  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoginHistoryOpen, setIsLoginHistoryOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Profile State (initialized from auth user)
  const student = user?.student;
  const [profileData, setProfileData] = useState({
    firstName: student?.firstName || 'Md. Sojib',
    lastName: student?.lastName || 'Ahmed',
    studentId: student?.studentId || '06224205101005',
    regNumber: '2022-CSE-18-005',
    rollNumber: '1805',
    universityEmail: user?.email || '06224205101005@student.kyau.edu.bd',
    personalEmail: student?.personalEmail || 'mdsojibahmed544@gmail.com',
    phone: student?.phone || '+880 1712-345678',
    gender: 'Male',
    dob: '2002-01-15',
    bloodGroup: student?.bloodGroup || 'B_POSITIVE',
    address: student?.address || 'KYAU Campus, Enayetpur, Sirajganj',
    emergencyContact: student?.emergencyContact || 'Father: +880 1812-987654',
    department: student?.department || 'Computer Science and Engineering',
    batch: student?.batch || 18,
    currentSemester: student?.currentSemester || '1-1',
    section: 'A',
    session: '2022-2023',
    admissionYear: 2022,
    cgpa: '3.85',
    academicStatus: 'ACTIVE',
    role: user?.role || 'CR',
    status: user?.status || 'ACTIVE',
    createdAt: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2024-01-10',
    lastLoginAt: user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Just Now',
    bio: student?.bio || 'Passionate CSE student, Class Representative (CR) for 18th Batch, leading systematic academic management.',
    avatar: student?.profilePicture || '',
  });

  const handleSaveProfile = (updated: any) => {
    setProfileData((prev) => ({ ...prev, ...updated }));
  };

  const handleDownloadIdCard = () => {
    toast.success(`🪪 Generating Student ID Card for ${profileData.firstName} ${profileData.lastName}...`, {
      icon: '📄',
      duration: 4000,
    });

    setTimeout(() => {
      window.print();
    }, 1000);
  };

  const getBloodGroupLabel = (bg: string) => {
    const map: Record<string, string> = {
      A_POSITIVE: 'A+',
      A_NEGATIVE: 'A-',
      B_POSITIVE: 'B+',
      B_NEGATIVE: 'B-',
      AB_POSITIVE: 'AB+',
      AB_NEGATIVE: 'AB-',
      O_POSITIVE: 'O+',
      O_NEGATIVE: 'O-',
    };
    return map[bg] || bg;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ─── Hero Header & Banner Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B2D3B] via-[#0D3B4C] to-[#0B2D3B] border border-cyan-500/20 p-6 md:p-8 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar Container */}
          <div className="relative group shrink-0 cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
            <div className="p-1 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 shadow-xl">
              <Avatar
                src={profileData.avatar}
                initials={profileData.firstName.charAt(0)}
                className="w-28 h-28 text-3xl border-4 border-[#0B2D3B]"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsAvatarModalOpen(true);
              }}
              className="absolute bottom-1 right-1 p-2.5 rounded-full bg-slate-900 text-emerald-400 border border-emerald-400/40 shadow-lg hover:scale-110 transition-all"
              title="Upload / Change Profile Picture"
            >
              <Camera size={15} />
            </button>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <h1 className="text-2xl md:text-3xl font-black text-white">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Sparkles size={12} /> {profileData.role}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ID: {profileData.studentId}
              </span>
            </div>

            <p className="text-sm text-cyan-200 font-medium">
              {profileData.department} • <strong className="text-emerald-400">{profileData.batch}th Batch</strong>
            </p>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed italic">
              "{profileData.bio}"
            </p>

            {/* Quick Action Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Edit3 size={14} /> Edit Profile
              </button>

              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5"
              >
                <KeyRound size={14} /> Change Password
              </button>

              <button
                onClick={handleDownloadIdCard}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Download size={14} /> Download ID Card
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Main Grid Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols wide on Desktop) */}
        <div className="lg:col-span-2 space-y-6">

          {/* 👤 Personal Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-surface border border-surface-2 p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-surface-2 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <User size={18} />
                </div>
                <h2 className="text-base font-bold text-white">Personal Information</h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Edit3 size={12} /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Full Name</span>
                <p className="text-sm font-bold text-white">{profileData.firstName} {profileData.lastName}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Student ID</span>
                <p className="text-sm font-mono font-bold text-emerald-400">{profileData.studentId}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Registration Number</span>
                <p className="text-sm font-mono font-bold text-cyan-300">{profileData.regNumber}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium">Roll Number</span>
                <p className="text-sm font-mono font-bold text-white">{profileData.rollNumber}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Mail size={12} className="text-cyan-400" /> University Email
                </span>
                <p className="text-xs font-mono font-bold text-white break-all">{profileData.universityEmail}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Mail size={12} className="text-emerald-400" /> Personal Email
                </span>
                <p className="text-xs font-mono font-bold text-emerald-300 break-all">{profileData.personalEmail}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Phone size={12} className="text-emerald-400" /> Phone Number
                </span>
                <p className="text-xs font-mono font-bold text-white">{profileData.phone}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Heart size={12} className="text-rose-400" /> Blood Group
                </span>
                <p className="text-sm font-bold text-rose-400">{getBloodGroupLabel(profileData.bloodGroup)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1 sm:col-span-2">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <MapPin size={12} className="text-cyan-400" /> Present Address
                </span>
                <p className="text-xs font-medium text-white">{profileData.address}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1 sm:col-span-2">
                <span className="text-slate-400 font-medium">Emergency Contact</span>
                <p className="text-xs font-medium text-amber-300">{profileData.emergencyContact}</p>
              </div>
            </div>
          </motion.div>

          {/* 🎓 Academic Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-surface border border-surface-2 p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-surface-2 pb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <GraduationCap size={18} />
              </div>
              <h2 className="text-base font-bold text-white">Academic Information</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center space-y-1">
                <span className="text-slate-400 font-medium">Batch</span>
                <p className="text-base font-black text-emerald-400">{profileData.batch}th</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center space-y-1">
                <span className="text-slate-400 font-medium">Current Semester</span>
                <p className="text-base font-black text-cyan-300">{profileData.currentSemester}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center space-y-1">
                <span className="text-slate-400 font-medium">Section / Session</span>
                <p className="text-xs font-bold text-white">{profileData.section} • {profileData.session}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-center space-y-1">
                <span className="text-slate-400 font-medium">Current CGPA</span>
                <p className="text-base font-black text-emerald-300">{profileData.cgpa}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Department</span>
                <span className="font-bold text-white">{profileData.department}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400 font-medium">Academic Status</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 size={10} /> {profileData.academicStatus}
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column (1 Col wide) */}
        <div className="space-y-6">

          {/* 🛡️ Account & Security Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-surface border border-surface-2 p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-surface-2 pb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Shield size={18} />
              </div>
              <h2 className="text-base font-bold text-white">Account & Security</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400">Role</span>
                <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {profileData.role}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400">Account Status</span>
                <span className="font-bold text-emerald-300">{profileData.status}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400">Last Login</span>
                <span className="font-mono text-slate-300">{profileData.lastLoginAt}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400">Account Created</span>
                <span className="font-mono text-slate-300">{profileData.createdAt}</span>
              </div>
            </div>

            {/* Security Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <KeyRound size={14} /> Change Password (OTP)
                </span>
                <Lock size={12} className="text-slate-500" />
              </button>

              <button
                onClick={() => setIsLoginHistoryOpen(true)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <History size={14} className="text-emerald-400" /> View Login History
                </span>
                <Clock size={12} className="text-slate-500" />
              </button>
            </div>
          </motion.div>

          {/* 📄 Academic Shortcuts & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-surface border border-surface-2 p-6 space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-surface-2 pb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Layers size={18} />
              </div>
              <h2 className="text-base font-bold text-white">Academic Shortcuts</h2>
            </div>

            <div className="space-y-2.5 text-xs">
              <button
                onClick={handleDownloadIdCard}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 text-emerald-300 font-bold hover:brightness-125 transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <FileText size={16} /> Download Student ID Card (PDF)
                </span>
                <Download size={14} />
              </button>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <BookOpen size={14} className="text-cyan-400" /> Enrolled Courses
                </span>
                <strong className="text-white">6 Courses</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Attendance Summary
                </span>
                <strong className="text-emerald-400 font-mono">94% Attendance</strong>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-2">
                  <Award size={14} className="text-amber-400" /> Result CGPA
                </span>
                <strong className="text-amber-400 font-mono font-bold">3.85 / 4.00</strong>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* ─── Modals ─── */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={profileData}
        onSave={handleSaveProfile}
      />

      <LoginHistoryModal
        isOpen={isLoginHistoryOpen}
        onClose={() => setIsLoginHistoryOpen(false)}
      />

      <ForgotPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        initialEmail={profileData.universityEmail}
        initialStudentId={profileData.studentId}
      />

      <ChangeAvatarModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        currentAvatar={profileData.avatar}
        onSaveAvatar={(newAvatar) => setProfileData((prev) => ({ ...prev, avatar: newAvatar }))}
      />
    </div>
  );
}

export default ProfilePage;
