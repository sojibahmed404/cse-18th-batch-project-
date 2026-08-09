import React, { useState } from 'react';
import { X, PlusCircle, ClipboardList, AlertCircle, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AssignmentItem } from '../../hooks/useAssignments';

interface AssignmentGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAssignment: (assignment: Omit<AssignmentItem, 'id'>) => void;
}

const COURSES_SUGGESTIONS = [
  { code: 'CSE-221', name: 'Software Engineering', teacher: 'Md. Ihteshamul Tushar' },
  { code: 'CSE-222', name: 'Software Engineering Lab', teacher: 'Md. Ihteshamul Tushar' },
  { code: 'CSE-223', name: 'Database Systems', teacher: 'Md. Abdur Razzak' },
  { code: 'CSE-224', name: 'Database Systems Lab', teacher: 'Md. Abdur Razzak' },
  { code: 'CSE-225', name: 'Computer Networks', teacher: 'Anika Tahsin' },
  { code: 'CSE-226', name: 'Computer Networks Lab', teacher: 'Anika Tahsin' },
  { code: 'CSE-227', name: 'Numerical Methods', teacher: 'Md. Rahatur Rahman' },
  { code: 'MAT-201', name: 'Mathematics III', teacher: 'Md. Razzak Hossain' },
];

export function AssignmentGeneratorModal({
  isOpen,
  onClose,
  onAddAssignment,
}: AssignmentGeneratorModalProps) {
  const [formData, setFormData] = useState({
    courseCode: 'CSE-221',
    courseTitle: 'Software Engineering',
    teacher: 'Md. Ihteshamul Tushar',
    title: '',
    type: 'Assignment 01',
    deadline: '',
    daysLeft: '3 Days Left',
    urgency: 'high' as AssignmentItem['urgency'],
    totalMarks: 20,
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const found = COURSES_SUGGESTIONS.find(c => c.code === selectedCode);
    if (found) {
      setFormData(prev => ({
        ...prev,
        courseCode: found.code,
        courseTitle: found.name,
        teacher: found.teacher,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deadline.trim()) {
      setError('Please fill in both the assignment topic and due date.');
      return;
    }

    onAddAssignment({
      courseCode: formData.courseCode,
      courseTitle: formData.courseTitle,
      teacher: formData.teacher,
      title: formData.title.trim(),
      type: formData.type,
      deadline: formData.deadline.trim(),
      daysLeft: formData.daysLeft.trim() || 'Due Soon',
      urgency: formData.urgency,
      totalMarks: Number(formData.totalMarks) || 20,
    });

    // Reset Form
    setFormData({
      courseCode: 'CSE-221',
      courseTitle: 'Software Engineering',
      teacher: 'Md. Ihteshamul Tushar',
      title: '',
      type: 'Assignment 01',
      deadline: '',
      daysLeft: '3 Days Left',
      urgency: 'high',
      totalMarks: 20,
    });
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ClipboardList size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Add Assignment Deadline</h3>
              <p className="text-xs text-slate-400">Add new assignment / lab report deadline</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-xs text-rose-300 border border-rose-500/20">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Select Subject */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <BookOpen size={13} className="text-emerald-400" /> Select Subject / Course *
            </label>
            <select
              value={formData.courseCode}
              onChange={handleCourseChange}
              className="flex h-10 w-full rounded-lg border border-emerald-500/40 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              {COURSES_SUGGESTIONS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name} ({c.teacher})
                </option>
              ))}
            </select>
          </div>

          {/* Topic Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Assignment Topic / Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Requirement Specification & Use Case Diagrams"
              className="bg-slate-950 border-slate-800 text-white text-xs h-10"
              required
            />
          </div>

          {/* Type & Total Marks */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="flex h-10 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Assignment 01">Assignment 01</option>
                <option value="Assignment 02">Assignment 02</option>
                <option value="Assignment 03">Assignment 03</option>
                <option value="Lab Report 01">Lab Report 01</option>
                <option value="Lab Report 02">Lab Report 02</option>
                <option value="Lab Report 03">Lab Report 03</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Total Marks</label>
              <Input
                type="number"
                value={formData.totalMarks}
                onChange={(e) => setFormData(prev => ({ ...prev, totalMarks: Number(e.target.value) }))}
                className="bg-slate-950 border-slate-800 text-white text-xs h-10"
              />
            </div>
          </div>

          {/* Due Date & Days Remaining */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Due Date & Time *</label>
              <Input
                value={formData.deadline}
                onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                placeholder="e.g. Aug 15, 2026 — 11:59 PM"
                className="bg-slate-950 border-slate-800 text-white text-xs h-10"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Countdown Badge</label>
              <Input
                value={formData.daysLeft}
                onChange={(e) => setFormData(prev => ({ ...prev, daysLeft: e.target.value }))}
                placeholder="e.g. 5 Days Left"
                className="bg-slate-950 border-slate-800 text-white text-xs h-10"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full border-slate-800 text-slate-300 hover:bg-slate-800 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              <PlusCircle className="mr-1.5 h-4 w-4" /> Add Assignment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
