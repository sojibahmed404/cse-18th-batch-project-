import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Pin, Calendar, User, PlusCircle, Trash2, Sparkles } from 'lucide-react';
import { useNotices, NoticeItem } from '../hooks/useNotices';
import { NoticeGeneratorModal } from '../components/notices/NoticeGeneratorModal';
import toast from 'react-hot-toast';

export default function NoticesPage() {
  const { notices, addNotice, deleteNotice, togglePinNotice } = useNotices();
  const [filterType, setFilterType] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredNotices = notices.filter(
    (n) => filterType === 'ALL' || n.type === filterType
  );

  const handleAddNotice = (noticeData: Omit<NoticeItem, 'id' | 'date'>) => {
    addNotice(noticeData);
    toast.success('Notice published successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Bell className="text-amber-400" /> Notice Board
          </h1>
          <p className="text-sm text-slate-400">Class Test (CT) announcements, exam schedules, and batch updates.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-lg shadow-amber-500/20"
          >
            <PlusCircle size={16} /> Publish New Notice
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'CT', 'ASSIGNMENT', 'EXAM', 'QUIZ', 'BATCH'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterType === type
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {type === 'CT' ? 'CT (Class Test)' : type}
          </button>
        ))}
      </div>

      {/* Notice Cards */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center bg-slate-900/40">
            <p className="text-sm text-slate-400">No notices found for category "{filterType}".</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
            >
              <PlusCircle size={14} /> Publish First Notice
            </button>
          </div>
        ) : (
          filteredNotices.map((notice, idx) => (
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
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      >
                        <Pin size={10} className="fill-amber-300" /> PINNED
                      </button>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{notice.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{notice.content}</p>
                </div>

                <div className="text-right text-xs text-slate-500 shrink-0 space-y-2">
                  <div className="flex items-center gap-1 justify-end">
                    <Calendar size={12} /> {notice.date}
                  </div>
                  <div className="flex items-center gap-1 justify-end text-slate-400">
                    <User size={12} /> {notice.publishedBy}
                  </div>
                  <button
                    onClick={() => {
                      deleteNotice(notice.id);
                      toast.success('Notice deleted');
                    }}
                    className="text-slate-600 hover:text-rose-400 text-[11px] flex items-center gap-1 ml-auto pt-1"
                    title="Delete Notice"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Notice Generator Modal */}
      <NoticeGeneratorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddNotice={handleAddNotice}
      />
    </div>
  );
}
