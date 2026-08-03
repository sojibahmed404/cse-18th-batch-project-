import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Pin, Tag, Calendar, User, Search, AlertTriangle } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'BATCH' | 'COURSE' | 'QUIZ' | 'EXAM' | 'EMERGENCY';
  publishedBy: string;
  date: string;
  isPinned: boolean;
}

const sampleNotices: Notice[] = [
  {
    id: '1',
    title: 'Software Engineering Assignment 02 & Submission Portal Open',
    content: 'Dear 18th batch students, Assignment 02 on System Requirements Specification has been assigned. Please generate your PDF cover page using the portal and submit before August 5, 2026.',
    type: 'BATCH',
    publishedBy: 'CR (Sojib Ahmed)',
    date: 'Aug 01, 2026',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Database Management Systems Lab Final Schedule',
    content: 'The DBMS Lab Final Exam will take place next Monday, August 10, 2026, in CSE Lab 02 starting at 09:00 AM.',
    type: 'EXAM',
    publishedBy: 'Co-CR',
    date: 'Jul 30, 2026',
    isPinned: true,
  },
  {
    id: '3',
    title: 'Computer Networks Quiz 03 Syllabus Update',
    content: 'Quiz 03 will cover Data Link Layer, MAC Protocol, and Ethernet Framing.',
    type: 'QUIZ',
    publishedBy: 'Co-CR',
    date: 'Jul 28, 2026',
    isPinned: false,
  },
];

export default function NoticesPage() {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredNotices = sampleNotices.filter(
    (n) => filterType === 'ALL' || n.type === filterType
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bell className="text-amber-400" /> Notice Board
          </h1>
          <p className="text-sm text-slate-400">Important batch announcements, quiz schedules, and exam updates.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {['ALL', 'BATCH', 'EXAM', 'QUIZ'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === type
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Notice Cards */}
      <div className="space-y-4">
        {filteredNotices.map((notice, idx) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`relative rounded-2xl border p-6 backdrop-blur-md transition-all ${
              notice.isPinned
                ? 'border-amber-500/30 bg-amber-950/10 hover:border-amber-500/50'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {notice.type}
                  </span>
                  {notice.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <Pin size={10} /> PINNED
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{notice.content}</p>
              </div>
              <div className="text-right text-xs text-slate-500 shrink-0 space-y-1">
                <div className="flex items-center gap-1 justify-end">
                  <Calendar size={12} /> {notice.date}
                </div>
                <div className="flex items-center gap-1 justify-end text-slate-400">
                  <User size={12} /> {notice.publishedBy}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
