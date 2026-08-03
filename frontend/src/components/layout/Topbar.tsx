import React, { useState, useEffect } from 'react';
import { Menu, Search, Bell, Moon, Sun, Lock, LogOut, User as UserIcon, Calendar, Clock, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { toggleTheme } from '../../store/themeSlice';
import { logout } from '../../store/authSlice';
import { Avatar } from '../ui/Avatar';
import { ChangePasswordModal } from '../auth/ChangePasswordModal';
import { toast } from 'react-hot-toast';

interface TopbarProps {
  onMenuClick: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Topbar({ onMenuClick, toggleSidebar }: TopbarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.mode);
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
  const { user } = useSelector((state: RootState) => state.auth);

  // Dropdown & Modal state
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  // Current Live Clock
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const studentName = user?.student 
    ? `${user.student.firstName} ${user.student.lastName}`.trim() 
    : user?.email || 'CSE Student';

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-cyan-500/20 bg-[#0B2D3B]/90 px-4 backdrop-blur-md sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-slate-300 lg:hidden hover:text-white"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Desktop sidebar toggle */}
      <button
        type="button"
        className="hidden lg:block -m-2.5 p-2.5 text-slate-300 hover:text-white"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Center Search Bar */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">Search</label>
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-400" />
          <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white placeholder:text-slate-400 focus:ring-0 text-sm"
            placeholder="Search CSE courses, notices, assignments..."
            type="search"
            name="search"
          />
        </form>

        <div className="flex items-center gap-x-3 lg:gap-x-5">
          
          {/* Semester Badge & Live Date/Time */}
          <div className="hidden xl:flex items-center space-x-3 text-xs bg-slate-900/60 px-3 py-1.5 rounded-xl border border-cyan-500/20 text-slate-300">
            <div className="flex items-center space-x-1 font-mono text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentTime}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentDate}</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
              18th Batch (3-1)
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            className="-m-2.5 p-2 text-slate-300 hover:text-white transition-colors"
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-cyan-400" />}
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative -m-2.5 p-2 text-slate-300 hover:text-white transition-colors"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </button>

          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-700" />

          {/* User Profile Menu Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="-m-1.5 flex items-center p-1.5 hover:bg-slate-800/60 rounded-xl transition-colors space-x-2"
            >
              <Avatar 
                src={user?.student?.profilePicture} 
                initials={studentName.charAt(0).toUpperCase()} 
                size="sm"
              />
              <div className="hidden lg:block text-left text-xs">
                <p className="font-bold text-white leading-none">{studentName}</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5 leading-none">
                  {user?.student?.studentId || user?.role || '18th Batch'}
                </p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0B2D3B] border border-cyan-500/30 shadow-2xl p-2 text-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                {/* Student Info Card */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 mb-2">
                  <p className="text-sm font-bold text-white">{studentName}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                      Role: {user?.role || 'STUDENT'}
                    </span>
                    <span className="text-slate-400">ID: {user?.student?.studentId}</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setShowChangePassword(true);
                    }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/80 text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span>Change Password (OTP)</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Change Password Security Modal */}
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </header>
  );
}

export default Topbar;
