import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Bell, ClipboardList, Calendar, 
  ArrowUpRight, FileText, Download, Sparkles, BookOpen, Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();
  const studentName = user?.student?.firstName || 'Student';

  const stats = [
    { title: 'Enrolled Courses', value: '5 Courses', icon: GraduationCap, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { title: 'Pending Assignments', value: '2 Due Soon', icon: ClipboardList, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { title: 'Active Notices', value: '4 New', icon: Bell, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { title: 'Current Semester', value: '4th Semester (2-2)', icon: BookOpen, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  const quickActions = [
    { name: 'Cover Page Generator', path: '/cover-page', icon: FileText, desc: 'Generate A4 PDF Cover Page', highlight: true },
    { name: 'Course Materials', path: '/courses', icon: Download, desc: 'Slides, Notes & Books' },
    { name: 'Notice Board', path: '/notices', icon: Bell, desc: 'Pinned & Class Updates' },
    { name: 'Class Routine', path: '/routines', icon: Calendar, desc: 'Weekly & Exam Schedule' },
  ];

  const notices = [
    { id: '1', title: 'Software Engineering Assignment 02 Released', type: 'ASSIGNMENT', date: 'Today, 10:30 AM', isPinned: true },
    { id: '2', title: 'Database Systems Lab Final Exam Date', type: 'EXAM', date: 'Yesterday', isPinned: true },
    { id: '3', title: 'Computer Networks Quiz 03 Announcement', type: 'QUIZ', date: 'Jul 28, 2026', isPinned: false },
  ];

  const assignments = [
    { id: '1', course: 'CSE-221', title: 'Requirement Specification & Use Case Diagram', deadline: 'Aug 05, 2026', daysLeft: '4 Days Left' },
    { id: '2', course: 'CSE-223', title: 'Relational Database Schema Design & Normalization', deadline: 'Aug 08, 2026', daysLeft: '7 Days Left' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-emerald-950/40 p-6 md:p-8 border border-indigo-500/20 shadow-2xl"
      >
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-xs font-semibold text-indigo-300">
            <Sparkles size={14} /> Khwaja Yunus Ali University — CSE 18th Batch
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Welcome back, <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">{studentName}</span>!
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Access your academic resources, course slides, assignment submission details, and generate instant assignment cover pages.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link 
              to="/cover-page" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30"
            >
              <FileText size={18} /> Cover Page Generator
            </Link>
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition-all"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md hover:border-slate-700 transition-all shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.title}</span>
                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
              </div>
              <div className="mt-3 text-xl font-bold text-white">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.name}
                to={action.path}
                className={`group relative overflow-hidden rounded-xl border p-5 transition-all duration-200 ${
                  action.highlight 
                    ? 'border-indigo-500/40 bg-indigo-950/20 hover:border-indigo-500/70 hover:bg-indigo-900/30' 
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${action.highlight ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    <Icon size={22} />
                  </div>
                  <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">{action.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{action.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Notices & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell size={20} className="text-amber-400" />
              <h2 className="text-lg font-bold text-white">Latest Notices</h2>
            </div>
            <Link to="/notices" className="text-xs font-semibold text-indigo-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40 hover:border-slate-700 transition-all flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 uppercase">
                      {n.type}
                    </span>
                    {n.isPinned && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                        PINNED
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-200 hover:text-indigo-300 cursor-pointer">{n.title}</h4>
                </div>
                <span className="text-xs text-slate-500 shrink-0">{n.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ClipboardList size={20} className="text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Upcoming Deadlines</h2>
            </div>
            <Link to="/assignments" className="text-xs font-semibold text-indigo-400 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {assignments.map((a) => (
              <div key={a.id} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40 hover:border-slate-700 transition-all flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    {a.course}
                  </span>
                  <h4 className="text-sm font-semibold text-slate-200">{a.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock size={12} /> Deadline: {a.deadline}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                  {a.daysLeft}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
