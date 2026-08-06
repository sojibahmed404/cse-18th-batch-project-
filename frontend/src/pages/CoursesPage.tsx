import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import {
  GraduationCap,
  BookOpen,
  Download,
  User,
  Search,
  Phone,
  Mail,
  Award,
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  LayoutList,
  LayoutGrid,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Layers,
  Building,
  Bookmark,
  Bell,
  Plus,
  UploadCloud,
  X,
  Trash2,
  ShieldCheck
} from 'lucide-react';

export interface CourseMaterialItem {
  id: string;
  title: string;
  type: 'SLIDE' | 'NOTE' | 'BOOK' | 'PREVIOUS_QUESTION' | 'LAB_MANUAL';
  fileUrl: string;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
  description?: string;
}

export interface CourseAssignmentItem {
  id: string;
  title: string;
  description: string;
  topic: string;
  deadline: string;
  totalMarks: number;
  status: 'PENDING' | 'SUBMITTED' | 'UPCOMING';
  fileUrl?: string;
}

export interface CourseNoticeItem {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'QUIZ' | 'ASSIGNMENT' | 'GENERAL' | 'EXAM';
}

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
  officeRoom?: string;
  schedule?: string;
  description?: string;
  syllabus?: string[];
  slidesCount: number;
  notesCount: number;
  booksCount: number;
  materials?: CourseMaterialItem[];
  assignments?: CourseAssignmentItem[];
  notices?: CourseNoticeItem[];
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
    officeRoom: 'Faculty Building, Room 402',
    schedule: 'Sunday 09:30 AM - 11:00 AM, Tuesday 11:00 AM - 12:30 PM',
    description: 'Concepts of database design, ER modeling, SQL, normalization, relational algebra, transaction processing, and concurrency control.',
    syllabus: [
      'Introduction to Database Systems & Architecture',
      'Entity-Relationship (ER) & Extended ER Modeling',
      'Relational Algebra & Relational Calculus',
      'SQL: DDL, DML, Complex Queries & Joins',
      'Functional Dependencies & Normalization (1NF to BCNF)',
      'Transaction Management, ACID properties & Concurrency Control'
    ],
    slidesCount: 14,
    notesCount: 6,
    booksCount: 3,
    materials: [
      {
        id: 'm1',
        title: 'Chapter 1: Intro to Database Systems & Architecture',
        type: 'SLIDE',
        fileUrl: '#',
        fileSize: '4.2 MB',
        uploadDate: '2026-07-10',
        downloadCount: 48,
        description: 'Lecture slides covering file systems vs DBMS and 3-schema architecture.'
      },
      {
        id: 'm2',
        title: 'Chapter 2: ER Diagrams & Relational Mapping',
        type: 'SLIDE',
        fileUrl: '#',
        fileSize: '6.1 MB',
        uploadDate: '2026-07-18',
        downloadCount: 52,
        description: 'Entities, attributes, relationships, weak entities, and conversion to tables.'
      },
      {
        id: 'm3',
        title: 'Complete SQL Cheatsheet & Query Practice Notes',
        type: 'NOTE',
        fileUrl: '#',
        fileSize: '1.8 MB',
        uploadDate: '2026-07-25',
        downloadCount: 89,
        description: 'Handwritten & typed SQL snippets for Joins, Subqueries & Aggregate functions.'
      },
      {
        id: 'm4',
        title: 'Database System Concepts (Silberschatz 7th Ed)',
        type: 'BOOK',
        fileUrl: '#',
        fileSize: '24.5 MB',
        uploadDate: '2026-07-02',
        downloadCount: 110,
        description: 'Standard reference textbook for CSE 0613-3101.'
      },
      {
        id: 'm5',
        title: 'Normalization Practice Problems & Solutions',
        type: 'NOTE',
        fileUrl: '#',
        fileSize: '2.4 MB',
        uploadDate: '2026-08-01',
        downloadCount: 64,
        description: 'Step by step guide to converting tables into 1NF, 2NF, 3NF and BCNF.'
      }
    ],
    assignments: [
      {
        id: 'a1',
        title: 'Assignment 01: Relational Algebra & Normalization',
        description: 'Solve the provided ER diagram to relational schema conversion and decompose relations into 3NF and BCNF.',
        topic: 'Relational Algebra & Normalization',
        deadline: '2026-08-15',
        totalMarks: 20,
        status: 'PENDING',
      },
      {
        id: 'a2',
        title: 'Assignment 02: Complex SQL Queries & Triggers',
        description: 'Write SQL scripts for library management system including stored procedures, views, and integrity triggers.',
        topic: 'Advanced SQL & Triggers',
        deadline: '2026-08-28',
        totalMarks: 20,
        status: 'UPCOMING',
      }
    ],
    notices: [
      {
        id: 'n1',
        title: 'DBMS Midterm Class Test Announcement',
        date: '2026-08-02',
        content: 'Class Test 1 will take place on Sunday 10th August during regular lecture hours covering Chapters 1 to 3.',
        type: 'QUIZ'
      }
    ]
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
    officeRoom: 'Faculty Building, Room 402',
    schedule: 'Monday 02:00 PM - 04:30 PM (Lab 3)',
    description: 'Hands-on practical sessions in Oracle / PostgreSQL / MySQL for database creation, querying, stored procedures, and frontend integration.',
    syllabus: [
      'Oracle / MySQL Installation & Environment Setup',
      'DDL Statements: CREATE, ALTER, DROP, TRUNCATE',
      'DML Statements: INSERT, UPDATE, DELETE, SELECT',
      'Complex SQL: Joins, Nested Queries, Set Operations',
      'PL/SQL: Functions, Stored Procedures & Triggers',
      'Term Project: Complete Web/Desktop App DB Backend'
    ],
    slidesCount: 8,
    notesCount: 4,
    booksCount: 2,
    materials: [
      {
        id: 'm201',
        title: 'DBMS Lab Manual 01: DDL & DML Basics',
        type: 'LAB_MANUAL',
        fileUrl: '#',
        fileSize: '3.1 MB',
        uploadDate: '2026-07-12',
        downloadCount: 42,
        description: 'Instructions for MySQL/PostgreSQL basic schema creation.'
      },
      {
        id: 'm202',
        title: 'DBMS Lab Manual 02: PL/SQL Triggers & Procedures',
        type: 'LAB_MANUAL',
        fileUrl: '#',
        fileSize: '2.8 MB',
        uploadDate: '2026-07-28',
        downloadCount: 38,
        description: 'Writing trigger functions for audit logs and table validations.'
      }
    ],
    assignments: [
      {
        id: 'a201',
        title: 'Lab Report 01: Library Management System Schema',
        description: 'Create tables with constraints, insert sample data of 10 rows per table, and execute 15 specified query tasks.',
        topic: 'Library Management System Database Implementation',
        deadline: '2026-08-12',
        totalMarks: 15,
        status: 'PENDING',
      }
    ],
    notices: [
      {
        id: 'n201',
        title: 'Lab Report 1 Submission Deadline Extended',
        date: '2026-08-04',
        content: 'Deadline for Lab Report 01 has been extended to 12th August midnight.',
        type: 'GENERAL'
      }
    ]
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
    officeRoom: 'Faculty Building, Room 405',
    schedule: 'Monday 10:00 AM - 11:30 AM, Wednesday 11:30 AM - 01:00 PM',
    description: 'Fundamental principles of operating system architecture, process management, thread synchronization, memory management, virtual memory, file systems, and CPU scheduling.',
    syllabus: [
      'Operating System Structures & System Calls',
      'Processes, Threads, and Inter-Process Communication (IPC)',
      'CPU Scheduling Algorithms (FCFS, SJF, Priority, Round Robin)',
      'Process Synchronization: Semaphores & Mutex Locks',
      'Deadlocks: Avoidance, Detection, and Bankers Algorithm',
      'Memory Management: Paging, Segmentation, & Virtual Memory'
    ],
    slidesCount: 16,
    notesCount: 7,
    booksCount: 2,
    materials: [
      {
        id: 'm301',
        title: 'OS Lecture 01: Operating System Structures & System Calls',
        type: 'SLIDE',
        fileUrl: '#',
        fileSize: '5.4 MB',
        uploadDate: '2026-07-08',
        downloadCount: 55,
        description: 'Kernel modes, dual mode operation, interrupt handling.'
      },
      {
        id: 'm302',
        title: 'CPU Scheduling Numerical Problems & Solutions',
        type: 'NOTE',
        fileUrl: '#',
        fileSize: '3.0 MB',
        uploadDate: '2026-07-22',
        downloadCount: 71,
        description: 'Gantt chart calculations for FCFS, Shortest Job First, Round Robin.'
      },
      {
        id: 'm303',
        title: 'Operating System Concepts (Galvin 10th Ed)',
        type: 'BOOK',
        fileUrl: '#',
        fileSize: '28.9 MB',
        uploadDate: '2026-07-01',
        downloadCount: 125,
        description: 'Dinosaur book for OS course.'
      }
    ],
    assignments: [
      {
        id: 'a301',
        title: 'Assignment 01: CPU Scheduling & Bankers Algorithm',
        description: 'Calculate average turnaround time and waiting time for 5 processes and verify deadlock safety state using Bankers algorithm.',
        topic: 'CPU Scheduling & Deadlock Avoidance',
        deadline: '2026-08-18',
        totalMarks: 20,
        status: 'PENDING',
      }
    ],
    notices: []
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
    officeRoom: 'Faculty Building, Room 405',
    schedule: 'Wednesday 02:00 PM - 04:30 PM (Lab 2)',
    description: 'Practical Linux shell scripting, system calls using C in Linux environment, POSIX thread programming, and process creation using fork().',
    syllabus: [
      'Linux Terminal Commands & Bash Scripting',
      'System Calls in C: fork(), exec(), wait(), exit()',
      'POSIX Threads (pthreads) Creation & Synchronization',
      'Implementing CPU Scheduling Algorithms in C/C++',
      'Page Replacement Algorithms Implementation (FIFO, LRU)'
    ],
    slidesCount: 9,
    notesCount: 5,
    booksCount: 1,
    materials: [
      {
        id: 'm401',
        title: 'Linux Shell Scripting Lab Guide',
        type: 'LAB_MANUAL',
        fileUrl: '#',
        fileSize: '2.1 MB',
        uploadDate: '2026-07-14',
        downloadCount: 39,
        description: 'Bash variables, loops, conditional statements and file handling.'
      }
    ],
    assignments: [
      {
        id: 'a401',
        title: 'Lab Report 01: Process Creation & IPC in C',
        description: 'Implement fork() hierarchy in C and demonstrate parent-child pipe communication.',
        topic: 'Linux Process Creation and IPC via Pipe',
        deadline: '2026-08-20',
        totalMarks: 15,
        status: 'UPCOMING',
      }
    ],
    notices: []
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
    officeRoom: 'Faculty Building, Room 408',
    schedule: 'Sunday 11:30 AM - 01:00 PM, Thursday 09:30 AM - 11:00 AM',
    description: 'Mathematical foundations of computer science: Automata theory, Deterministic & Nondeterministic Finite Automata, Regular Expressions, Context-Free Grammars, Pushdown Automata, and Turing Machines.',
    syllabus: [
      'Mathematical Preliminaries & Formal Proofs',
      'Deterministic Finite Automata (DFA) & NFA Design',
      'NFA to DFA Conversion & DFA Minimization',
      'Regular Expressions & Pumping Lemma for Regular Languages',
      'Context-Free Grammars (CFG) & Parse Trees',
      'Pushdown Automata (PDA) & Turing Machines (TM)'
    ],
    slidesCount: 18,
    notesCount: 9,
    booksCount: 3,
    materials: [
      {
        id: 'm501',
        title: 'Ch 1: Finite Automata (DFA & NFA) Construction',
        type: 'SLIDE',
        fileUrl: '#',
        fileSize: '5.8 MB',
        uploadDate: '2026-07-06',
        downloadCount: 68,
        description: 'Detailed transition tables and state diagrams.'
      },
      {
        id: 'm502',
        title: 'Introduction to Theory of Computation (Michael Sipser)',
        type: 'BOOK',
        fileUrl: '#',
        fileSize: '18.2 MB',
        uploadDate: '2026-07-01',
        downloadCount: 94,
        description: 'Standard textbook for automata and formal languages.'
      }
    ],
    assignments: [
      {
        id: 'a501',
        title: 'Assignment 01: DFA Minimization & NFA Conversion',
        description: 'Convert given NFA with epsilon transitions into equivalent DFA and minimize state count.',
        topic: 'DFA Minimization and NFA Conversion',
        deadline: '2026-08-16',
        totalMarks: 20,
        status: 'PENDING',
      }
    ],
    notices: []
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
    officeRoom: 'Faculty Building, Room 403',
    schedule: 'Tuesday 09:30 AM - 11:00 AM, Thursday 11:30 AM - 01:00 PM',
    description: 'Internal architecture of 8086 microprocessor, assembly language programming, memory interfacing, 8051/Arduino microcontrollers, and IoT embedded applications.',
    syllabus: [
      '8086 Microprocessor Architecture & Register Set',
      '8086 Bus Organization, Memory Segmentation & Pin Diagram',
      'Assembly Language Instructions: Data Transfer, Arithmetic, Logic',
      'Interfacing Chips: 8255 PPI, 8259 PIC, 8254 PIT',
      '8051 Microcontroller Architecture & Ports',
      'Embedded Systems & Arduino Hardware Interfacing'
    ],
    slidesCount: 15,
    notesCount: 8,
    booksCount: 3,
    materials: [
      {
        id: 'm601',
        title: '8086 Architecture & Register Reference Guide',
        type: 'SLIDE',
        fileUrl: '#',
        fileSize: '4.9 MB',
        uploadDate: '2026-07-09',
        downloadCount: 50,
        description: 'BIU, EU, segment registers, and status flags.'
      },
      {
        id: 'm602',
        title: 'Microprocessor & Interfacing (Douglas V. Hall)',
        type: 'BOOK',
        fileUrl: '#',
        fileSize: '31.5 MB',
        uploadDate: '2026-07-03',
        downloadCount: 88,
        description: 'Standard textbook for 8086 assembly and hardware.'
      }
    ],
    assignments: [
      {
        id: 'a601',
        title: 'Assignment 01: 8086 Assembly Language Array Sorting',
        description: 'Write an EMU8086 assembly program to sort an array of 10 numbers in ascending order.',
        topic: '8086 Assembly Language Sorting Algorithm',
        deadline: '2026-08-22',
        totalMarks: 20,
        status: 'UPCOMING',
      }
    ],
    notices: []
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
    officeRoom: 'Faculty Building, Room 403',
    schedule: 'Tuesday 02:00 PM - 04:30 PM (Hardware Lab)',
    description: 'EMU8086 emulator programming, Proteus circuit simulation, Arduino microcontroller sensor interfacing (LCD, Ultrasonic, Temperature, Motors).',
    syllabus: [
      'EMU8086 Assembly Programming Environment',
      'String & Array Operations in Assembly',
      'Proteus Circuit Simulation Setup',
      'Arduino Sensor Interfacing (DHT11, HC-SR04)',
      'Motor Control (Servo & Stepper) using Microcontrollers'
    ],
    slidesCount: 10,
    notesCount: 4,
    booksCount: 2,
    materials: [
      {
        id: 'm701',
        title: 'EMU8086 Assembly Lab Manual',
        type: 'LAB_MANUAL',
        fileUrl: '#',
        fileSize: '3.4 MB',
        uploadDate: '2026-07-15',
        downloadCount: 41,
        description: 'Complete lab tasks for 8086 emulator exercises.'
      }
    ],
    assignments: [
      {
        id: 'a701',
        title: 'Lab Report 01: Arduino Distance Measurement System',
        description: 'Design and simulate an ultrasonic distance meter with 16x2 LCD display in Proteus.',
        topic: 'Arduino Ultrasonic Sensor & LCD Interfacing',
        deadline: '2026-08-25',
        totalMarks: 15,
        status: 'UPCOMING',
      }
    ],
    notices: []
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
    officeRoom: 'Faculty Building, Room 408',
    schedule: 'Sunday 02:00 PM - 03:30 PM, Wednesday 09:30 AM - 11:00 AM',
    description: 'System Development Life Cycle (SDLC), feasibility analysis, requirement gathering, Data Flow Diagrams (DFD), UML modeling, software architecture, and system testing.',
    syllabus: [
      'Overview of Systems & SDLC Methodologies (Agile, Waterfall)',
      'Feasibility Study & Cost-Benefit Analysis',
      'Requirement Determination & Use Case Analysis',
      'Data Flow Diagrams (Context, Level-0, Level-1 DFD)',
      'Object-Oriented Analysis & UML Diagrams (Class, Sequence, State)',
      'Software Testing, Quality Assurance & Maintenance'
    ],
    slidesCount: 12,
    notesCount: 6,
    booksCount: 2,
    materials: [
      {
        id: 'm801',
        title: 'SDLC Methodologies & Requirement Engineering Slides',
        type: 'SLIDE',
        fileUrl: '#',
        fileSize: '4.6 MB',
        uploadDate: '2026-07-11',
        downloadCount: 47,
        description: 'Waterfall vs Agile vs Spiral model comparisons.'
      },
      {
        id: 'm802',
        title: 'Systems Analysis and Design (Kendall & Kendall 9th Ed)',
        type: 'BOOK',
        fileUrl: '#',
        fileSize: '21.4 MB',
        uploadDate: '2026-07-04',
        downloadCount: 76,
        description: 'Core reference book for system design.'
      }
    ],
    assignments: [
      {
        id: 'a801',
        title: 'Assignment 01: University Portal System Requirement Document & DFD',
        description: 'Prepare Software Requirement Specification (SRS) and draw Level 0 and Level 1 DFDs for a student portal.',
        topic: 'SRS Document & Data Flow Diagrams (DFD)',
        deadline: '2026-08-19',
        totalMarks: 20,
        status: 'PENDING',
      }
    ],
    notices: []
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
    officeRoom: 'Faculty Building, Room 406',
    schedule: 'Monday 11:30 AM - 01:00 PM, Thursday 02:00 PM - 03:30 PM',
    description: 'Signals, transmission media, digital & analog signal encoding, multiplexing, error detection & correction codes, data link control protocols, and switching networks.',
    syllabus: [
      'Data Communication Fundamentals & OSI vs TCP/IP Models',
      'Data and Signals: Analog vs Digital, Fourier Analysis, Bandwidth',
      'Digital Transmission: Line Coding (NRZ, RZ, Manchester, AMI)',
      'Analog Transmission: ASK, FSK, PSK, QAM Modulations',
      'Multiplexing (FDM, TDM, WDM) & Spread Spectrum',
      'Error Detection & Correction: Parity, CRC, Hamming Code'
    ],
    slidesCount: 13,
    notesCount: 7,
    booksCount: 2,
    materials: [
      {
        id: 'm901',
        title: 'Ch 1-2: Data Signals & Transmission Media',
        type: 'SLIDE',
        fileUrl: '#',
        fileSize: '5.1 MB',
        uploadDate: '2026-07-07',
        downloadCount: 53,
        description: 'Guided and unguided transmission media specs.'
      },
      {
        id: 'm902',
        title: 'Line Coding Schemes & Manchester Encoding Notes',
        type: 'NOTE',
        fileUrl: '#',
        fileSize: '2.2 MB',
        uploadDate: '2026-07-20',
        downloadCount: 65,
        description: 'Diagrams and spectral density comparisons.'
      },
      {
        id: 'm903',
        title: 'Data Communications and Networking (Behrouz A. Forouzan 5th Ed)',
        type: 'BOOK',
        fileUrl: '#',
        fileSize: '26.8 MB',
        uploadDate: '2026-07-02',
        downloadCount: 105,
        description: 'Standard textbook for Data Communication.'
      }
    ],
    assignments: [
      {
        id: 'a901',
        title: 'Assignment 01: CRC Calculation & Line Coding Signals',
        description: 'Draw line coding wave forms for a given bit stream and calculate Cyclic Redundancy Check (CRC) remainder.',
        topic: 'CRC Error Detection & Line Coding Waveforms',
        deadline: '2026-08-21',
        totalMarks: 20,
        status: 'PENDING',
      }
    ],
    notices: []
  },
];

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // CR Role authorization check (CR, CO_CR, ADMIN)
  const isCR = user?.role === 'CR' || user?.role === 'CO_CR' || user?.role === 'ADMIN';

  // Dynamic courses list state
  const [coursesList, setCoursesList] = useState<CourseItem[]>(KYAU_COURSES_LIST);

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(searchParams.get('id'));
  const [activeTab, setActiveTab] = useState<'info' | 'slides' | 'assignments' | 'notices'>('info');
  const [materialFilter, setMaterialFilter] = useState<string>('ALL');

  // Slide / Material Upload Modal State (CR Portal)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState<CourseMaterialItem['type']>('SLIDE');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadFileUrl, setUploadFileUrl] = useState('');

  // Sync selected course from URL parameter if present
  useEffect(() => {
    const courseId = searchParams.get('id');
    if (courseId) {
      setSelectedCourseId(courseId);
    }
  }, [searchParams]);

  const selectedCourse = coursesList.find((c) => c.id === selectedCourseId);

  const handleSelectCourse = (id: string) => {
    setSelectedCourseId(id);
    setActiveTab('info');
    setSearchParams({ id });
  };

  const handleBackToList = () => {
    setSelectedCourseId(null);
    setSearchParams({});
  };

  const filteredCourses = coursesList.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase())
  );

  const handleGenerateCoverPage = (courseCode: string, topic: string) => {
    navigate(`/cover-page?courseCode=${encodeURIComponent(courseCode)}&topic=${encodeURIComponent(topic)}`);
  };

  // Submit Uploaded Slide/Material (CR System)
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    if (!uploadTitle.trim()) {
      toast.error('Please enter a title for the material');
      return;
    }

    const fileSizeString = uploadFile
      ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB`
      : '3.5 MB';

    const newMaterial: CourseMaterialItem = {
      id: `m_${Date.now()}`,
      title: uploadTitle.trim(),
      type: uploadType,
      fileUrl: uploadFileUrl.trim() || '#',
      fileSize: fileSizeString,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      description: uploadDescription.trim() || undefined,
    };

    setCoursesList((prev) =>
      prev.map((c) => {
        if (c.id === selectedCourse.id) {
          const updatedMaterials = [newMaterial, ...(c.materials || [])];
          return {
            ...c,
            materials: updatedMaterials,
            slidesCount: uploadType === 'SLIDE' ? c.slidesCount + 1 : c.slidesCount,
            notesCount: uploadType === 'NOTE' ? c.notesCount + 1 : c.notesCount,
            booksCount: uploadType === 'BOOK' ? c.booksCount + 1 : c.booksCount,
          };
        }
        return c;
      })
    );

    toast.success('Slide/Material uploaded successfully!');
    setIsUploadModalOpen(false);
    setUploadTitle('');
    setUploadType('SLIDE');
    setUploadDescription('');
    setUploadFile(null);
    setUploadFileUrl('');
  };

  // Delete Material Handler (CR Access)
  const handleDeleteMaterial = (materialId: string) => {
    if (!selectedCourse) return;
    if (!window.confirm('Are you sure you want to delete this study material?')) return;

    setCoursesList((prev) =>
      prev.map((c) => {
        if (c.id === selectedCourse.id) {
          return {
            ...c,
            materials: (c.materials || []).filter((m) => m.id !== materialId),
          };
        }
        return c;
      })
    );

    toast.success('Study material deleted successfully.');
  };

  // -------------------------------------------------------------
  // COURSE DETAIL VIEW
  // -------------------------------------------------------------
  if (selectedCourse) {
    const materialsList = selectedCourse.materials || [];
    const filteredMaterials = materialFilter === 'ALL'
      ? materialsList
      : materialsList.filter((m) => m.type === materialFilter);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="space-y-6"
      >
        {/* Back Button & Top Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-semibold text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 transition-all shadow-md group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-indigo-400" />
            Back to All Courses List
          </button>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              {selectedCourse.code}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {selectedCourse.credit} Credits
            </span>
          </div>
        </div>

        {/* Hero Banner Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <GraduationCap size={16} />
                <span>{selectedCourse.semester}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {selectedCourse.title}
              </h1>
              {selectedCourse.description && (
                <p className="text-sm text-slate-300 leading-relaxed pt-1">
                  {selectedCourse.description}
                </p>
              )}
            </div>

            {/* Teacher Card in Banner */}
            <div className="shrink-0 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 shadow-xl space-y-3 min-w-[280px]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-400 font-bold border border-indigo-500/30">
                  <User size={22} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-indigo-400 flex items-center gap-1">
                    <Award size={12} /> {selectedCourse.designation}
                  </p>
                  <p className="text-sm font-bold text-white">{selectedCourse.teacher}</p>
                  <p className="text-[11px] text-slate-400 font-mono">Department of CSE</p>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-slate-400 shrink-0" />
                  <span className="font-mono">{selectedCourse.mobile}</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Mail size={13} className="text-slate-400 shrink-0" />
                  <a href={`mailto:${selectedCourse.email}`} className="hover:text-indigo-400 font-mono truncate">
                    {selectedCourse.email}
                  </a>
                </div>
                {selectedCourse.officeRoom && (
                  <div className="flex items-center gap-2">
                    <Building size={13} className="text-slate-400 shrink-0" />
                    <span className="text-slate-300">{selectedCourse.officeRoom}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('info')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'info'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <BookOpen size={16} /> Course Information
          </button>
          <button
            onClick={() => setActiveTab('slides')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'slides'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <FileText size={16} /> Slides & Study Materials ({materialsList.length})
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'assignments'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers size={16} /> Assignments ({selectedCourse.assignments?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'notices'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Bell size={16} /> Notices ({selectedCourse.notices?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {/* TAB 1: INFORMATION */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Syllabus & Overview */}
              <div className="lg:col-span-8 space-y-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <BookOpen size={20} className="text-indigo-400" /> Course Syllabus & Key Topics
                  </h3>
                  {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 ? (
                    <ul className="space-y-3">
                      {selectedCourse.syllabus.map((topic, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                          <CheckCircle size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-200">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-400">Standard KYAU Department of CSE Syllabus applied.</p>
                  )}
                </div>

                {/* Class Schedule Card */}
                {selectedCourse.schedule && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md space-y-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Clock size={20} className="text-indigo-400" /> Class Schedule & Location
                    </h3>
                    <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 text-sm font-medium flex items-center gap-3">
                      <Calendar size={20} className="text-indigo-400 shrink-0" />
                      <span>{selectedCourse.schedule}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Marks & Course Stats Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Award size={20} className="text-indigo-400" /> Credit & Distribution
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400">Total Credits</span>
                      <span className="font-bold text-white">{selectedCourse.credit} Credits</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400">Attendance / Quiz</span>
                      <span className="font-bold text-slate-200">20%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400">Midterm Exam</span>
                      <span className="font-bold text-slate-200">30%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400">Final Exam</span>
                      <span className="font-bold text-slate-200">50%</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 to-slate-900 p-6 backdrop-blur-md text-center space-y-3">
                  <Sparkles size={24} className="text-indigo-400 mx-auto" />
                  <h4 className="font-bold text-white">Need Assignment Cover Page?</h4>
                  <p className="text-xs text-slate-300">Generate an official KYAU PDF cover page with prefilled course details.</p>
                  <button
                    onClick={() => handleGenerateCoverPage(selectedCourse.code, selectedCourse.title)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 px-4 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/30"
                  >
                    Generate Cover Page Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SLIDES & STUDY MATERIALS */}
          {activeTab === 'slides' && (
            <div className="space-y-6">
              {/* Category Filter Pills & Upload Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {[
                    { label: 'All Materials', value: 'ALL' },
                    { label: 'Lecture Slides', value: 'SLIDE' },
                    { label: 'Notes', value: 'NOTE' },
                    { label: 'Reference Books', value: 'BOOK' },
                    { label: 'Lab Manuals', value: 'LAB_MANUAL' },
                    { label: 'Past Questions', value: 'PREVIOUS_QUESTION' },
                  ].map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setMaterialFilter(f.value)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        materialFilter === f.value
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/30 shrink-0"
                >
                  <Plus size={16} /> Upload Slide / Material
                  <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-indigo-400/20 text-indigo-200 border border-indigo-400/30 font-mono">
                    CR Access
                  </span>
                </button>
              </div>

              {/* Materials Grid */}
              {filteredMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-md hover:border-indigo-500/40 hover:bg-slate-900 transition-all shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                                mat.type === 'SLIDE'
                                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                                  : mat.type === 'NOTE'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : mat.type === 'BOOK'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              }`}
                            >
                              {mat.type.replace('_', ' ')}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">{mat.fileSize}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar size={12} /> {mat.uploadDate}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                          {mat.title}
                        </h4>

                        {mat.description && (
                          <p className="text-xs text-slate-400 line-clamp-2">{mat.description}</p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                          <Download size={12} /> {mat.downloadCount} downloads
                        </span>
                        <div className="flex items-center gap-2">
                          {isCR && (
                            <button
                              onClick={() => handleDeleteMaterial(mat.id)}
                              title="Delete Material (CR Access)"
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                          <a
                            href={mat.fileUrl}
                            onClick={(e) => {
                              if (mat.fileUrl === '#') {
                                e.preventDefault();
                                toast.success(`Downloading: ${mat.title}`);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/20"
                          >
                            <Download size={14} /> Download
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
                  <FileText size={36} className="text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm font-medium">No study materials found for this category filter.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ASSIGNMENTS */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              {selectedCourse.assignments && selectedCourse.assignments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCourse.assignments.map((ass) => (
                    <div
                      key={ass.id}
                      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md space-y-4 hover:border-indigo-500/40 transition-all shadow-xl"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Clock size={13} /> Deadline: {ass.deadline}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-slate-300">
                          {ass.totalMarks} Marks
                        </span>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-white">{ass.title}</h4>
                        <p className="text-xs font-semibold text-indigo-400 mt-1">Topic: {ass.topic}</p>
                        <p className="text-sm text-slate-300 mt-2 leading-relaxed">{ass.description}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleGenerateCoverPage(selectedCourse.code, ass.topic)}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 px-4 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/30"
                        >
                          <FileText size={15} /> Generate Cover Page
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
                  <CheckCircle size={36} className="text-emerald-500 mx-auto" />
                  <p className="text-slate-300 text-base font-bold">No active assignments for this course!</p>
                  <p className="text-slate-500 text-xs">All assignments submitted or none published yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: NOTICES */}
          {activeTab === 'notices' && (
            <div className="space-y-4">
              {selectedCourse.notices && selectedCourse.notices.length > 0 ? (
                selectedCourse.notices.map((n) => (
                  <div key={n.id} className="rounded-2xl border border-indigo-500/30 bg-slate-900/80 p-5 backdrop-blur-md space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase">
                        {n.type}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{n.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-white">{n.title}</h4>
                    <p className="text-sm text-slate-300">{n.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3">
                  <Bell size={36} className="text-slate-600 mx-auto" />
                  <p className="text-slate-400 text-sm font-medium">No announcements published for this course yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upload Material Modal (CR System) */}
        <AnimatePresence>
          {isUploadModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 font-bold">
                      <UploadCloud size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Upload Study Material</h3>
                      <p className="text-xs text-slate-400">CR / Co-CR Material Upload Portal — {selectedCourse.code}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsUploadModalOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Material Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chapter 3: Relational Algebra & SQL Slides"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">Category / Type</label>
                      <select
                        value={uploadType}
                        onChange={(e) => setUploadType(e.target.value as any)}
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="SLIDE">Lecture Slide (স্লাইড)</option>
                        <option value="NOTE">Lecture Note (লেকচার নোট)</option>
                        <option value="BOOK">Reference Book (বই)</option>
                        <option value="LAB_MANUAL">Lab Manual (ল্যাব ম্যানুয়াল)</option>
                        <option value="PREVIOUS_QUESTION">Past Exam Question (প্রশ্নপত্র)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300">File Attachment</label>
                      <input
                        type="file"
                        onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                        className="w-full text-xs text-slate-400 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/20 file:text-indigo-300 hover:file:bg-indigo-600/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">File URL / Drive Link (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://drive.google.com/..."
                      value={uploadFileUrl}
                      onChange={(e) => setUploadFileUrl(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Description / Topic Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Brief summary of what this slide or note covers..."
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsUploadModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/30"
                    >
                      <UploadCloud size={16} /> Publish Material
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // MAIN COURSES DIRECTORY LIST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <GraduationCap className="text-indigo-400" /> Course Directory & Study Hub
          </h1>
          <p className="text-sm text-slate-400">
            Khwaja Yunus Ali University — Department of Computer Science & Engineering (18th Batch)
          </p>
        </div>

        {/* View Switcher & Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, code, or faculty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shrink-0">
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutList size={18} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Courses List Container */}
      {viewMode === 'list' ? (
        <div className="space-y-3">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => handleSelectCourse(course.id)}
              className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900 hover:border-indigo-500/50 p-4 md:p-5 backdrop-blur-md transition-all duration-200 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column: Code, Title, Faculty */}
              <div className="flex items-start md:items-center gap-4 flex-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 font-extrabold border border-indigo-500/30 text-sm font-mono shadow-inner">
                  #{String(idx + 1).padStart(2, '0')}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                      {course.code}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <BookOpen size={13} /> {course.credit} Credits
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 flex items-center gap-1.5">
                    <User size={13} className="text-slate-500" />
                    <span className="font-medium text-slate-300">{course.teacher}</span>
                    <span className="text-slate-500">• {course.designation}</span>
                  </p>
                </div>
              </div>

              {/* Right Column: Material Badges & Action Button */}
              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                <div className="flex items-center gap-2 text-xs">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                    <span className="font-bold text-indigo-400 block text-xs">{course.slidesCount}</span>
                    <span className="text-[10px] text-slate-400">Slides</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                    <span className="font-bold text-emerald-400 block text-xs">{course.notesCount}</span>
                    <span className="text-[10px] text-slate-400">Notes</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                    <span className="font-bold text-amber-400 block text-xs">{course.booksCount}</span>
                    <span className="text-[10px] text-slate-400">Books</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/20">
                    <span>Enter Course</span>
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Grid View Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => handleSelectCourse(course.id)}
              className="group cursor-pointer relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-md hover:border-indigo-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    {course.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <BookOpen size={14} className="text-emerald-400" /> {course.credit} Credits
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                  {course.title}
                </h3>

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
                </div>

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

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 py-2.5 px-4 text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/20">
                  <span>View Course Details</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

