import { useState, useEffect } from 'react';

export interface AssignmentItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  teacher: string;
  title: string;
  type: string;
  deadline: string;
  daysLeft: string;
  urgency: 'high' | 'medium' | 'low';
  totalMarks: number;
}

const STORAGE_KEY = 'cse18_portal_assignments_v1';

const defaultAssignments: AssignmentItem[] = [
  { 
    id: 'ass-1', 
    courseCode: 'CSE-221', 
    courseTitle: 'Software Engineering',
    teacher: 'Md. Ihteshamul Tushar',
    title: 'Software Requirement Specification (SRS) & Use Case Diagram', 
    type: 'Assignment 02',
    deadline: 'Aug 12, 2026 — 11:59 PM', 
    daysLeft: '3 Days Left',
    urgency: 'high',
    totalMarks: 20
  },
  { 
    id: 'ass-2', 
    courseCode: 'CSE-223', 
    courseTitle: 'Database Systems Lab',
    teacher: 'Md. Abdur Razzak',
    title: 'Relational Schema Design & SQL Complex Queries Implementation', 
    type: 'Lab Report 03',
    deadline: 'Aug 16, 2026 — 11:59 PM', 
    daysLeft: '7 Days Left',
    urgency: 'medium',
    totalMarks: 25
  },
  { 
    id: 'ass-3', 
    courseCode: 'CSE-225', 
    courseTitle: 'Computer Networks',
    teacher: 'Anika Tahsin',
    title: 'Packet Tracer Simulation & Subnetting Topology Design', 
    type: 'Assignment 01',
    deadline: 'Aug 20, 2026 — 05:00 PM', 
    daysLeft: '11 Days Left',
    urgency: 'low',
    totalMarks: 15
  },
];

export function useAssignments() {
  const [assignments, setAssignments] = useState<AssignmentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load assignments from localStorage', e);
    }
    return defaultAssignments;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
    } catch (e) {
      console.error('Failed to save assignments to localStorage', e);
    }
  }, [assignments]);

  const addAssignment = (newAssignment: Omit<AssignmentItem, 'id'>) => {
    const item: AssignmentItem = {
      ...newAssignment,
      id: `ass-${Date.now()}`,
    };
    setAssignments(prev => [item, ...prev]);
    return item;
  };

  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  return {
    assignments,
    addAssignment,
    deleteAssignment,
  };
}
