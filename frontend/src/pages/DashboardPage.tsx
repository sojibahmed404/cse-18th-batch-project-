import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, ClipboardList, Clock, Pin, 
  FileText, Sparkles, PlusCircle, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNotices, NoticeItem } from '../hooks/useNotices';
import { useAssignments, AssignmentItem } from '../hooks/useAssignments';
import { NoticeGeneratorModal } from '../components/notices/NoticeGeneratorModal';
import { AssignmentGeneratorModal } from '../components/assignments/AssignmentGeneratorModal';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user } = useAuth();
  const studentName = user?.student?.firstName ? `${user.student.firstName} ${user.student.lastName}` : 'Md. Sojib Ahmed';
  const { notices, addNotice, deleteNotice, togglePinNotice } = useNotices();
  const { assignments, addAssignment, deleteAssignment } = useAssignments();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const filteredNotices = activeCategory === 'ALL' 
    ? notices 
    : notices.filter(n => n.type === activeCategory);

  const handleAddNotice = (noticeData: Omit<NoticeItem, 'id' | 'date'>) => {
    addNotice(noticeData);
    toast.success('Notice published successfully!');
  };

  const handleAddAssignment = (assignmentData: Omit<AssignmentItem, 'id'>) => {
    addAssignment(assignmentData);
    toast.success('Assignment deadline added!');
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-2">
            <Sparkles size={13} /> Khwaja Yunus Ali University — CSE 18th Batch
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            Academic Dashboard
          </h1>
          <p className="text-sm text-slate-400">
            Welcome, <span className="text-slate-200 font-semibold">{studentName}</span> • View CT announcements, notices & assignment deadlines
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsNoticeModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-lg shadow-amber-500/20"
          >
            <PlusCircle size={15} /> Publish Notice
          </button>
          <button
            onClick={() => setIsAssignmentModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            <PlusCircle size={15} /> Add Assignment
          </button>
          <Link
            to="/cover-page"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
          >
            <FileText size={15} /> Cover Page Generator
          </Link>
        </div>
      </div>

      {/* Main Grid: Notices & Assignment Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Section: Notice Board (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Bell size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Notice Board</h2>
                <p className="text-xs text-slate-400">CT (Class Test), Exam & Batch announcements</p>
              </div>
            </div>

            {/* Category Filter Chips including CT */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs">
              {['ALL', 'CT', 'ASSIGNMENT', 'EXAM', 'QUIZ'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2 py-1 rounded-lg font-semibold transition-all text-[11px] ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'CT' ? 'CT' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notices Cards */}
          <div className="space-y-4">
            {filteredNotices.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center bg-slate-900/40">
                <p className="text-sm text-slate-400">No notices found for category "{activeCategory}".</p>
                <button
                  onClick={() => setIsNoticeModalOpen(true)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
                >
                  <PlusCircle size={14} /> Publish First Notice
                </button>
              </div>
            ) : (
              filteredNotices.map((notice, idx) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`relative overflow-hidden rounded-2xl border p-5 backdrop-blur-md transition-all duration-200 ${
                    notice.isPinned 
                      ? 'border-amber-500/40 bg-gradient-to-r from-amber-950/20 via-slate-900 to-slate-900/90 shadow-lg shadow-amber-500/5' 
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          notice.type === 'CT'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : notice.type === 'EXAM' 
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : notice.type === 'ASSIGNMENT'
                            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {notice.type === 'CT' ? 'CT (Class Test)' : notice.type}
                        </span>

                        {notice.isPinned && (
                          <button
                            onClick={() => togglePinNotice(notice.id)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          >
                            <Pin size={10} className="fill-amber-300" /> PINNED
                          </button>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-white hover:text-amber-300 transition-colors leading-snug">
                        {notice.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                        {notice.date}
                      </span>
                      <button
                        onClick={() => {
                          deleteNotice(notice.id);
                          toast.success('Notice removed');
                        }}
                        className="text-slate-600 hover:text-rose-400 p-1 transition-colors"
                        title="Delete Notice"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/50">
                    {notice.content}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/40">
                    <span>Posted by: <strong className="text-slate-200">{notice.publishedBy}</strong></span>
                    {!notice.isPinned && (
                      <button
                        onClick={() => togglePinNotice(notice.id)}
                        className="text-slate-500 hover:text-amber-400 text-[10px] font-semibold"
                      >
                        + Pin to top
                      </button>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Right Section: Assignment Deadlines (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ClipboardList size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">Assignment Deadlines</h2>
                <p className="text-xs text-slate-400">Upcoming submission dates & countdown</p>
              </div>
            </div>

            <button
              onClick={() => setIsAssignmentModalOpen(true)}
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <PlusCircle size={13} /> Add
            </button>
          </div>

          {/* Assignment Deadlines List with Delete Option */}
          <div className="space-y-4">
            {assignments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-800 p-8 text-center bg-slate-900/40">
                <p className="text-sm text-slate-400">No active assignment deadlines.</p>
                <button
                  onClick={() => setIsAssignmentModalOpen(true)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline font-semibold"
                >
                  <PlusCircle size={14} /> Add First Assignment
                </button>
              </div>
            ) : (
              assignments.map((ass, idx) => (
                <motion.div
                  key={ass.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md hover:border-slate-700 transition-all shadow-md space-y-3"
                >
                  {/* Course Header, Urgency & Delete Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {ass.courseCode}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">{ass.courseTitle}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold flex items-center gap-1 border ${
                        ass.urgency === 'high' 
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
                          : ass.urgency === 'medium'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      }`}>
                        <Clock size={12} /> {ass.daysLeft}
                      </span>

                      {/* Delete Option */}
                      <button
                        onClick={() => {
                          deleteAssignment(ass.id);
                          toast.success('Assignment deadline removed');
                        }}
                        className="text-slate-600 hover:text-rose-400 p-1 transition-colors"
                        title="Delete Assignment"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Assignment Title & Details */}
                  <div>
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                      {ass.type} • {ass.totalMarks} Marks
                    </span>
                    <h4 className="text-sm font-bold text-white leading-snug">
                      {ass.title}
                    </h4>
                  </div>

                  {/* Teacher & Deadline Info */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Instructor:</span>
                      <span className="font-semibold">{ass.teacher}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span className="text-slate-400">Due Date:</span>
                      <span className="font-bold text-amber-300">{ass.deadline}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-1 flex gap-2">
                    <Link
                      to={`/cover-page?courseCode=${encodeURIComponent(ass.courseCode)}&topic=${encodeURIComponent(ass.title)}`}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                    >
                      <FileText size={14} /> Generate Cover Page
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Notice Generator Modal */}
      <NoticeGeneratorModal
        isOpen={isNoticeModalOpen}
        onClose={() => setIsNoticeModalOpen(false)}
        onAddNotice={handleAddNotice}
      />

      {/* Assignment Generator Modal */}
      <AssignmentGeneratorModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        onAddAssignment={handleAddAssignment}
      />
    </div>
  );
}
