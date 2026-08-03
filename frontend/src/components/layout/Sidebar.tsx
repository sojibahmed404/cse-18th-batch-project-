import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, User, BookOpen, GraduationCap, ClipboardList, 
  Bell, Calendar, CalendarDays, Images, Download, Search, Shield, 
  Plus, Upload, LogOut 
} from 'lucide-react';
import { Avatar } from '../ui/Avatar';

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ isOpen, isMobileOpen, onMobileClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Profile', path: '/profile', icon: User, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Semesters', path: '/semesters', icon: BookOpen, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Courses', path: '/courses', icon: GraduationCap, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Assignments', path: '/assignments', icon: ClipboardList, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Notice Board', path: '/notices', icon: Bell, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Routine', path: '/routines', icon: Calendar, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Events', path: '/events', icon: CalendarDays, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Gallery', path: '/gallery', icon: Images, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Downloads', path: '/downloads', icon: Download, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    { name: 'Search', path: '/search', icon: Search, roles: ['STUDENT', 'CR', 'CO_CR', 'ADMIN'] },
    
    // CR/Co-CR exclusive
    { name: 'Publish Assignment', path: '/publish/assignment', icon: Plus, roles: ['CR', 'CO_CR'] },
    { name: 'Upload Materials', path: '/publish/material', icon: Upload, roles: ['CR', 'CO_CR'] },
    
    // Admin exclusive
    { name: 'Admin Panel', path: '/admin', icon: Shield, roles: ['ADMIN'] },
  ];

  const activeRole = user?.role || 'STUDENT';
  const filteredNavItems = navItems.filter(item => item.roles.includes(activeRole));

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-surface border-r border-surface-2 transition-all duration-300 ease-in-out lg:translate-x-0',
        isOpen ? 'w-[260px]' : 'w-[80px]',
        isMobileOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-center border-b border-surface-2 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-glow">
            <span className="text-xl font-bold text-white">18</span>
          </div>
          {(isOpen || isMobileOpen) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
              <span className="text-sm font-bold leading-none text-white">CSE 18th Batch</span>
              <span className="text-xs text-text-secondary">KYAU Portal</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3 custom-scrollbar">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => isMobileOpen && onMobileClose()}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-surface-2 hover:text-white'
                )
              }
            >
              <Icon size={20} className={cn('shrink-0', isActive ? 'text-primary' : 'text-text-secondary group-hover:text-white')} />
              
              <AnimatePresence>
                {(isOpen || isMobileOpen) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="truncate text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip for collapsed state */}
              {!isOpen && !isMobileOpen && (
                <div className="absolute left-14 hidden rounded-md bg-surface-3 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100 z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-surface-2 p-4">
        <div className={cn('flex items-center gap-3', !isOpen && !isMobileOpen && 'justify-center')}>
          <Avatar 
            src={user?.student?.profilePicture || user?.teacher?.profilePicture} 
            initials={user?.email?.charAt(0).toUpperCase()} 
          />
          
          {(isOpen || isMobileOpen) && (
            <div className="flex flex-1 flex-col truncate">
              <span className="truncate text-sm font-medium text-white">
                {user?.student?.firstName ? `${user.student.firstName} ${user.student.lastName}` : user?.email}
              </span>
              <span className="truncate text-xs text-text-secondary">
                {user?.role}
              </span>
            </div>
          )}
          
          {(isOpen || isMobileOpen) && (
            <button 
              onClick={logout}
              className="rounded-lg p-2 text-text-secondary hover:bg-danger/10 hover:text-danger transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
