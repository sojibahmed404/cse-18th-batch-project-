import { useState, useEffect } from 'react';

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  type: 'CT' | 'ASSIGNMENT' | 'EXAM' | 'QUIZ' | 'BATCH' | 'EMERGENCY';
  publishedBy: string;
  date: string;
  isPinned: boolean;
}

const STORAGE_KEY = 'cse18_portal_notices_v2';

const defaultNotices: NoticeItem[] = [
  {
    id: 'notice-1',
    title: 'Software Engineering (CSE-221) Class Test 02 (CT) Scheduled',
    content: 'Class Test 02 (CT) on Agile Software Development & UML Diagrams will be held next Monday at 10:00 AM.',
    type: 'CT',
    publishedBy: 'CR (Sojib Ahmed)',
    date: 'Today, 10:30 AM',
    isPinned: true,
  },
  {
    id: 'notice-2',
    title: 'Database Systems (CSE-223) Lab Final & Project Presentation',
    content: 'The Lab Final Examination and Project Defense for CSE-223 will take place in Lab 02 on 15th August 2026.',
    type: 'EXAM',
    publishedBy: 'Md. Abdur Razzak',
    date: 'Yesterday, 4:15 PM',
    isPinned: true,
  },
  {
    id: 'notice-3',
    title: 'Computer Networks (CSE-225) Assignment 01 Submission Deadline',
    content: 'Assignment 01 on Network Topology & Packet Tracer Simulation is due on 20th August.',
    type: 'ASSIGNMENT',
    publishedBy: 'Anika Tahsin',
    date: 'Aug 04, 2026',
    isPinned: false,
  },
];

export function useNotices() {
  const [notices, setNotices] = useState<NoticeItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load notices from localStorage', e);
    }
    return defaultNotices;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notices));
    } catch (e) {
      console.error('Failed to save notices to localStorage', e);
    }
  }, [notices]);

  const addNotice = (newNotice: Omit<NoticeItem, 'id' | 'date'>) => {
    const item: NoticeItem = {
      ...newNotice,
      id: `notice-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    };
    setNotices(prev => [item, ...prev]);
    return item;
  };

  const deleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
  };

  const togglePinNotice = (id: string) => {
    setNotices(prev =>
      prev.map(n => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  return {
    notices,
    addNotice,
    deleteNotice,
    togglePinNotice,
  };
}
