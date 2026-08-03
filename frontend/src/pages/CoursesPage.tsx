import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Download, User, Search, Phone, Mail, Award, CheckCircle } from 'lucide-react';

export interface CourseItem {
  id: string;
  code: string;
  title: string;
  credit: number;
  semester: string;
  teacher: string;
  designation: string;
  mobile: string;
  email: string;
  slidesCount: number;
  notesCount: number;
  booksCount: number;
}

export const KYAU_COURSES_LIST: CourseItem[] = [
  {
    id: '1',
    code: 'CSE 0613-3101',
    title: 'Database Management System',
    credit: 3.0,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Md. Abdur Razzak',
    designation: 'Lecturer',
    mobile: '01738759934',
    email: 'razzak.cse@kyau.edu.bd',
    slidesCount: 14,
    notesCount: 6,
    booksCount: 3,
  },
  {
    id: '2',
    code: 'CSE 0613-3102',
    title: 'Database Management System Lab',
    credit: 1.5,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Md. Abdur Razzak',
    designation: 'Lecturer',
    mobile: '01738759934',
    email: 'razzak.cse@kyau.edu.bd',
    slidesCount: 8,
    notesCount: 4,
    booksCount: 2,
  },
  {
    id: '3',
    code: 'CSE 0613-3103',
    title: 'Operating System',
    credit: 3.0,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Md. Iftekhar Hossain Tushar',
    designation: 'Lecturer on Probation',
    mobile: '01738207727',
    email: 'mdihtushar.cse@kyau.edu.bd',
    slidesCount: 16,
    notesCount: 7,
    booksCount: 2,
  },
  {
    id: '4',
    code: 'CSE 0613-3104',
    title: 'Operating System Lab',
    credit: 1.5,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Md. Iftekhar Hossain Tushar',
    designation: 'Lecturer on Probation',
    mobile: '01738207727',
    email: 'mdihtushar.cse@kyau.edu.bd',
    slidesCount: 9,
    notesCount: 5,
    booksCount: 1,
  },
  {
    id: '5',
    code: 'CSE 0613-3105',
    title: 'Theory of Computation',
    credit: 3.0,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Mst. Anika Amzad',
    designation: 'Lecturer',
    mobile: '+8801744832245',
    email: 'anika.cse@kyau.edu.bd',
    slidesCount: 18,
    notesCount: 9,
    booksCount: 3,
  },
  {
    id: '6',
    code: 'CSE 0613-3107',
    title: 'Microprocessor, Microcontroller and Embedded Systems',
    credit: 3.0,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Md. Rahat Khan',
    designation: 'Lecturer',
    mobile: '01521303383',
    email: 'rahat.cse@kyau.edu.bd',
    slidesCount: 15,
    notesCount: 8,
    booksCount: 3,
  },
  {
    id: '7',
    code: 'CSE 0613-3108',
    title: 'Microprocessor, Microcontroller and Embedded Systems Lab',
    credit: 1.5,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Md. Rahat Khan',
    designation: 'Lecturer',
    mobile: '01521303383',
    email: 'rahat.cse@kyau.edu.bd',
    slidesCount: 10,
    notesCount: 4,
    booksCount: 2,
  },
  {
    id: '8',
    code: 'CSE 0613-3109',
    title: 'System Analysis and Design',
    credit: 3.0,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Mst. Anika Amzad',
    designation: 'Lecturer',
    mobile: '+8801744832245',
    email: 'anika.cse@kyau.edu.bd',
    slidesCount: 12,
    notesCount: 6,
    booksCount: 2,
  },
  {
    id: '9',
    code: 'CSE 0613-3111',
    title: 'Data Communication',
    credit: 3.0,
    semester: '3rd Year 1st Semester (3-1)',
    teacher: 'Ishrat Zahan Raka',
    designation: 'Lecturer',
    mobile: '01752473694',
    email: 'ishrat.cse@kyau.edu.bd',
    slidesCount: 13,
    notesCount: 7,
    booksCount: 2,
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState('');

  const filteredCourses = KYAU_COURSES_LIST.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <GraduationCap className="text-indigo-400" /> Course & Faculty Directory
          </h1>
          <p className="text-sm text-slate-400">
            Khwaja Yunus Ali University — Department of Computer Science & Engineering (18th Batch)
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search course title, code or faculty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course, idx) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                  {course.code}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                  <BookOpen size={14} className="text-emerald-400" /> {course.credit} Credits
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                {course.title}
              </h3>

              {/* Teacher Details */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 font-bold">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-100">{course.teacher}</p>
                    <p className="text-[11px] font-medium text-indigo-400 flex items-center gap-1">
                      <Award size={12} /> {course.designation}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 space-y-1 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-slate-500 shrink-0" />
                    <span className="font-mono text-slate-300">{course.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail size={12} className="text-slate-500 shrink-0" />
                    <a href={`mailto:${course.email}`} className="hover:text-indigo-300 truncate text-slate-300">
                      {course.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Material Stats */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-slate-950/40 p-2 border border-slate-800">
                  <span className="block font-bold text-indigo-400 text-sm">{course.slidesCount}</span>
                  <span className="text-[10px] text-slate-400">Slides</span>
                </div>
                <div className="rounded-xl bg-slate-950/40 p-2 border border-slate-800">
                  <span className="block font-bold text-emerald-400 text-sm">{course.notesCount}</span>
                  <span className="text-[10px] text-slate-400">Notes</span>
                </div>
                <div className="rounded-xl bg-slate-950/40 p-2 border border-slate-800">
                  <span className="block font-bold text-amber-400 text-sm">{course.booksCount}</span>
                  <span className="text-[10px] text-slate-400">Books</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 px-4 text-xs font-semibold text-white transition-all shadow-lg shadow-indigo-600/20">
                <Download size={14} /> Download Materials & Notes
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
