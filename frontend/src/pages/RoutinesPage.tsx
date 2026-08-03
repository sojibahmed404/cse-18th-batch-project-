import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, BookOpen, Download } from 'lucide-react';

interface ClassPeriod {
  time: string;
  course: string;
  courseCode: string;
  teacher: string;
  room: string;
}

interface DayRoutine {
  day: string;
  classes: ClassPeriod[];
}

const weeklyRoutine: DayRoutine[] = [
  {
    day: 'Sunday',
    classes: [
      { time: '09:00 AM - 10:30 AM', course: 'Software Engineering', courseCode: 'CSE-221', teacher: 'Dr. Md. Al-Amin', room: 'Room 302' },
      { time: '10:45 AM - 12:15 PM', course: 'Database Systems Lab', courseCode: 'CSE-224', teacher: 'Engr. Mahmud Hasan', room: 'CSE Lab 2' },
    ],
  },
  {
    day: 'Monday',
    classes: [
      { time: '09:00 AM - 10:30 AM', course: 'Computer Networks', courseCode: 'CSE-225', teacher: 'Tahmina Akter', room: 'Room 304' },
      { time: '10:45 AM - 12:15 PM', course: 'Design & Analysis of Algorithms', courseCode: 'CSE-229', teacher: 'Sojib Rahman', room: 'Room 302' },
    ],
  },
  {
    day: 'Tuesday',
    classes: [
      { time: '09:00 AM - 10:30 AM', course: 'Operating System', courseCode: 'CSE-227', teacher: 'Dr. Shariful Islam', room: 'Room 302' },
      { time: '10:45 AM - 01:00 PM', course: 'Software Engineering Lab', courseCode: 'CSE-222', teacher: 'Dr. Md. Al-Amin', room: 'CSE Lab 1' },
    ],
  },
  {
    day: 'Wednesday',
    classes: [
      { time: '09:00 AM - 10:30 AM', course: 'Database Management Systems', courseCode: 'CSE-223', teacher: 'Engr. Mahmud Hasan', room: 'Room 302' },
      { time: '10:45 AM - 12:15 PM', course: 'Computer Networks Lab', courseCode: 'CSE-226', teacher: 'Tahmina Akter', room: 'CSE Lab 3' },
    ],
  },
];

export default function RoutinesPage() {
  const [activeTab, setActiveTab] = useState<'WEEKLY' | 'EXAM'>('WEEKLY');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Calendar className="text-cyan-400" /> Routine Viewer
          </h1>
          <p className="text-sm text-slate-400">Weekly class routine, lab sessions, and upcoming exam schedules for 18th batch.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            onClick={() => setActiveTab('WEEKLY')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'WEEKLY' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Class Routine
          </button>
          <button
            onClick={() => setActiveTab('EXAM')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'EXAM' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Exam Routine
          </button>
        </div>
      </div>

      {/* Routine Content */}
      {activeTab === 'WEEKLY' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weeklyRoutine.map((dayData, idx) => (
            <motion.div
              key={dayData.day}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4"
            >
              <h3 className="text-lg font-bold text-indigo-300 pb-2 border-b border-slate-800">
                {dayData.day}
              </h3>
              <div className="space-y-3">
                {dayData.classes.map((cls, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/50 space-y-2 hover:border-indigo-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                        {cls.courseCode}
                      </span>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {cls.time}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{cls.course}</h4>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1"><User size={12} /> {cls.teacher}</span>
                      <span className="flex items-center gap-1 text-slate-300 font-semibold"><MapPin size={12} /> {cls.room}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center backdrop-blur-md space-y-3">
          <Calendar size={40} className="mx-auto text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Midterm Exam Routine Upcoming</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Exam dates for Fall 2026 will be published by the Controller of Examinations and updated here.
          </p>
        </div>
      )}
    </div>
  );
}
