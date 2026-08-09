import React, { useState } from 'react';
import { X, PlusCircle, Pin, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { NoticeItem } from '../../hooks/useNotices';

interface NoticeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNotice: (notice: Omit<NoticeItem, 'id' | 'date'>) => void;
  defaultPublisherName?: string;
}

const COURSES_SUGGESTIONS = [
  { code: 'CSE-221', name: 'Software Engineering' },
  { code: 'CSE-222', name: 'Software Engineering Lab' },
  { code: 'CSE-223', name: 'Database Systems' },
  { code: 'CSE-224', name: 'Database Systems Lab' },
  { code: 'CSE-225', name: 'Computer Networks' },
  { code: 'CSE-226', name: 'Computer Networks Lab' },
  { code: 'CSE-227', name: 'Numerical Methods' },
  { code: 'MAT-201', name: 'Mathematics III' },
];

export function NoticeGeneratorModal({
  isOpen,
  onClose,
  onAddNotice,
  defaultPublisherName = 'CR (Sojib Ahmed)',
}: NoticeGeneratorModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    content: '',
    type: 'CT' as NoticeItem['type'],
    publishedBy: defaultPublisherName,
    isPinned: false,
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCode = e.target.value;
    const found = COURSES_SUGGESTIONS.find(c => c.code === selectedCode);
    if (found) {
      setFormData(prev => ({
        ...prev,
        subject: selectedCode,
        title: prev.title ? prev.title : `${found.code} ${found.name} Class Test (CT) 01 Announcement`,
      }));
    } else {
      setFormData(prev => ({ ...prev, subject: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in both the title and notice details.');
      return;
    }

    onAddNotice({
      title: formData.title.trim(),
      content: formData.content.trim(),
      type: formData.type,
      publishedBy: formData.publishedBy.trim() || defaultPublisherName,
      isPinned: formData.isPinned,
    });

    // Reset Form
    setFormData({
      subject: '',
      title: '',
      content: '',
      type: 'CT',
      publishedBy: defaultPublisherName,
      isPinned: false,
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
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Generate New Notice</h3>
              <p className="text-xs text-slate-400">Publish notice for CSE 18th Batch</p>
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

          {/* Subject Name Suggestion Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <BookOpen size={13} className="text-amber-400" /> Select Subject / Course (Optional Suggestion)
            </label>
            <select
              value={formData.subject}
              onChange={handleSubjectSelect}
              className="flex h-10 w-full rounded-lg border border-amber-500/40 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            >
              <option value="">Choose a subject to auto-fill title...</option>
              {COURSES_SUGGESTIONS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Notice Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. CSE-221 Software Engineering Class Test (CT) 02 Announcement"
              className="bg-slate-950 border-slate-800 text-white text-xs h-10"
              required
            />
          </div>

          {/* Type / Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Notice Category *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as NoticeItem['type'] }))}
                className="flex h-10 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="CT">CT (Class Test)</option>
                <option value="ASSIGNMENT">ASSIGNMENT</option>
                <option value="EXAM">EXAM (Mid / Final)</option>
                <option value="QUIZ">QUIZ</option>
                <option value="BATCH">BATCH NOTICE</option>
                <option value="EMERGENCY">EMERGENCY</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Published By</label>
              <Input
                value={formData.publishedBy}
                onChange={(e) => setFormData(prev => ({ ...prev, publishedBy: e.target.value }))}
                placeholder="Publisher Name / CR"
                className="bg-slate-950 border-slate-800 text-white text-xs h-10"
              />
            </div>
          </div>

          {/* Details / Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Notice Details *</label>
            <textarea
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Enter full notice description, syllabus, timing, room number, or submission guidelines..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          {/* Pin Option */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) => setFormData(prev => ({ ...prev, isPinned: e.target.checked }))}
                className="rounded border-slate-800 bg-slate-950 text-amber-500 focus:ring-amber-500 h-4 w-4"
              />
              <span className="flex items-center gap-1">
                <Pin size={12} className="text-amber-400" /> Pin Notice to Top
              </span>
            </label>
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
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20"
            >
              <PlusCircle className="mr-1.5 h-4 w-4" /> Publish Notice
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
