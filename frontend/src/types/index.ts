export type Role = 'STUDENT' | 'CO_CR' | 'CR' | 'ADMIN';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED';
export type BloodGroup = 'A_POSITIVE' | 'A_NEGATIVE' | 'B_POSITIVE' | 'B_NEGATIVE' | 'AB_POSITIVE' | 'AB_NEGATIVE' | 'O_POSITIVE' | 'O_NEGATIVE' | 'UNKNOWN';
export type MaterialType = 'SLIDE' | 'NOTE' | 'BOOK' | 'PREVIOUS_QUESTION' | 'LAB_MANUAL' | 'VIDEO' | 'OTHER';
export type AssignmentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type SubmissionStatus = 'NOT_SUBMITTED' | 'SUBMITTED' | 'LATE' | 'GRADED';
export type NoticeType = 'BATCH' | 'COURSE' | 'QUIZ' | 'VIVA' | 'ASSIGNMENT' | 'LAB' | 'HOLIDAY' | 'EMERGENCY' | 'EVENT';
export type RoutineType = 'WEEKLY' | 'EXAM' | 'LAB';
export type NotificationType = 'ASSIGNMENT' | 'NOTICE' | 'QUIZ' | 'DEADLINE' | 'SYSTEM' | 'LOGIN' | 'EVENT';

export interface User {
  id: string;
  email: string;
  role: Role;
  status: UserStatus;
  isEmailVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  student?: Student;
  teacher?: Teacher;
}

export interface Student {
  id: string;
  userId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  department: string;
  batch: number;
  currentSemester: string;
  personalEmail?: string;
  phone?: string;
  bloodGroup: BloodGroup;
  address?: string;
  emergencyContact?: string;
  github?: string;
  linkedin?: string;
  bio?: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department: string;
  email?: string;
  phone?: string;
  profilePicture?: string;
  isActive: boolean;
}

export interface Semester {
  id: string;
  name: string;
  displayName: string;
  year: number;
  term: number;
  isActive: boolean;
  isCurrent: boolean;
  courses?: Course[];
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credit: number;
  semesterId: string;
  teacherId?: string;
  description?: string;
  syllabus?: string;
  marksDistribution?: string;
  isActive: boolean;
  semester?: Semester;
  teacher?: Teacher;
  materials?: CourseMaterial[];
  assignments?: Assignment[];
  notices?: Notice[];
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  uploadedById: string;
  title: string;
  description?: string;
  type: MaterialType;
  fileUrl: string;
  fileName: string;
  fileSize?: number;
  downloadCount: number;
  createdAt: string;
  course?: Course;
}

export interface Assignment {
  id: string;
  courseId: string;
  publishedById: string;
  title: string;
  description: string;
  fileUrl?: string;
  deadline: string;
  totalMarks: number;
  status: AssignmentStatus;
  allowLate: boolean;
  latePenalty?: number;
  createdAt: string;
  course?: Course;
  submissions?: AssignmentSubmission[];
  mySubmission?: AssignmentSubmission;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  fileUrl?: string;
  fileName?: string;
  status: SubmissionStatus;
  marks?: number;
  feedback?: string;
  submittedAt?: string;
  gradedAt?: string;
}

export interface Notice {
  id: string;
  publishedById: string;
  courseId?: string;
  title: string;
  content: string;
  type: NoticeType;
  isPinned: boolean;
  isArchived: boolean;
  fileUrl?: string;
  createdAt: string;
  publishedBy?: User;
  course?: Course;
}

export interface Routine {
  id: string;
  type: RoutineType;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  courseId?: string;
  teacherName?: string;
  roomNumber?: string;
  notes?: string;
  examDate?: string;
  isActive: boolean;
  courseName?: string;
  courseCode?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  venue?: string;
  imageUrl?: string;
  isRegistrationOpen: boolean;
  registrationDeadline?: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  albumName: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface DashboardStats {
  totalStudents?: number;
  totalCourses?: number;
  totalAssignments?: number;
  pendingAssignments?: number;
  totalNotices?: number;
  unreadNotifications?: number;
  activeUsers?: number;
  todayLogins?: number;
}

export interface CoverPageData {
  type: 'Assignment' | 'Lab Report';
  no: string;
  courseCode: string;
  courseTitle: string;
  topic: string;
  semSeason: string;
  semYear: string;
  studentName: string;
  studentId: string;
  batch: string;
  semester: string;
  teacherName: string;
  teacherDesignation: string;
  teacherDept: string;
}
