import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const STUDENT_PASSWORD = 'Student@12345';
const ADMIN_PASSWORD = 'Admin@12345';

const students = [
  // CR
  { firstName: 'Md. Sojib', lastName: 'Ahmed', studentId: '06224205101005', email: '06224205101005@student.kyau.edu.bd', role: 'CR' as const },
  // Co-CR
  { firstName: 'Md. Rakibul', lastName: 'Islam', studentId: '06224205101001', email: '06224205101001@student.kyau.edu.bd', role: 'CO_CR' as const },
  // Students
  { firstName: 'Siam', lastName: 'Hossain', studentId: '06224205101002', email: '06224205101002@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Shahariar Ahmed', lastName: 'Mukta', studentId: '06224205101003', email: '06224205101003@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Mst. Anamika', lastName: 'Kanon', studentId: '06224205101004', email: '06224205101004@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Mst. Ananna', lastName: 'Khandaker', studentId: '06224205101006', email: '06224205101006@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Rakib Hasan', lastName: 'Riyad', studentId: '06224205101007', email: '06224205101007@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Most. Khadija', lastName: 'Khatun', studentId: '06224205101008', email: '06224205101008@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Rezwan Ahmed', lastName: 'Ratul', studentId: '06224205101010', email: '06224205101010@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Maruf Ibna Abdullah', lastName: 'Rifat', studentId: '06224205101011', email: '06224205101011@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md.', lastName: 'Rabbi', studentId: '06224205101012', email: '06224205101012@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Mst. Mashkat Jahan', lastName: 'Shila', studentId: '06224205101013', email: '06224205101013@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Ijaj Ahmed', lastName: 'Rafi', studentId: '06224205101014', email: '06224205101014@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Sabbir Hossain', lastName: 'Rahat', studentId: '06224205101016', email: '06224205101016@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Abid Hasan', lastName: 'Hujaifa', studentId: '06224205101018', email: '06224205101018@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Sabiha Rumman', lastName: 'Medha', studentId: '06224205101019', email: '06224205101019@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Intaj Hassan', lastName: 'Nibir', studentId: '06224205101020', email: '06224205101020@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Asif', lastName: 'Foysal', studentId: '06224205101021', email: '06224205101021@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Fardin Khan', lastName: 'Sadi', studentId: '06224205101022', email: '06224205101022@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Abir', lastName: 'Deb', studentId: '06224205101024', email: '06224205101024@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Bashudeb Kumer', lastName: 'Paul', studentId: '06224205101025', email: '06224205101025@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Abdur Rahim', lastName: 'Ratul', studentId: '06224205101026', email: '06224205101026@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Tahsin Tasnim', lastName: 'Tandra', studentId: '06224205101027', email: '06224205101027@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Maream', lastName: '', studentId: '06224205101028', email: '06224205101028@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Imran', lastName: 'Hossain', studentId: '06224205101029', email: '06224205101029@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Abu Sowad Mohammad Ali', lastName: 'Siam', studentId: '06224205101030', email: '06224205101030@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Fatima Rahman', lastName: 'Shoshi', studentId: '06224205101031', email: '06224205101031@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Rukaiya Rafiq', lastName: 'Ulfa', studentId: '06224205101032', email: '06224205101032@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'S.M. Salman', lastName: 'Farshi', studentId: '06224205101033', email: '06224205101033@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Tawhidur Rahman', lastName: 'Shishir', studentId: '06224205101034', email: '06224205101034@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Samiul Islam', lastName: 'Shihab', studentId: '06224205101035', email: '06224205101035@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Shimul', lastName: 'Sarkar', studentId: '06224205101036', email: '06224205101036@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Khairun Nahar', lastName: 'Sara', studentId: '06224205101038', email: '06224205101038@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Montasir Monir', lastName: 'Alif', studentId: '06224205101039', email: '06224205101039@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Tarak Rahman', lastName: 'Shakib', studentId: '06224105101022', email: '06224105101022@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Robiul Awal', lastName: 'Sumon', studentId: '06224105101024', email: '06224105101024@student.kyau.edu.bd', role: 'STUDENT' as const },
  { firstName: 'Md. Rashedul', lastName: 'Islam', studentId: '06224105101034', email: '06224105101034@student.kyau.edu.bd', role: 'STUDENT' as const },
];

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.loginLog.deleteMany();
  await prisma.assignmentSubmission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.courseMaterial.deleteMany();
  await prisma.course.deleteMany();
  await prisma.semester.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.routine.deleteMany();
  await prisma.event.deleteMany();
  await prisma.gallery.deleteMany();
  await prisma.emailVerification.deleteMany();
  await prisma.passwordReset.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();
  await prisma.systemSetting.deleteMany();

  const studentHash = await bcrypt.hash(STUDENT_PASSWORD, 12);
  const adminHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  // Create Admin
  await prisma.user.create({
    data: {
      email: 'admin@kyau.edu.bd',
      password: adminHash,
      role: 'ADMIN',
      status: 'ACTIVE',
      isEmailVerified: true,
      student: {
        create: {
          studentId: 'ADMIN001',
          firstName: 'System',
          lastName: 'Administrator',
          department: 'Computer Science and Engineering',
          batch: 18,
          currentSemester: '1-1',
        },
      },
    },
  });

  // Create all students
  for (const s of students) {
    await prisma.user.create({
      data: {
        email: s.email,
        password: studentHash,
        role: s.role,
        status: 'ACTIVE',
        isEmailVerified: true,
        student: {
          create: {
            studentId: s.studentId,
            firstName: s.firstName,
            lastName: s.lastName || ' ',
            department: 'Computer Science and Engineering',
            batch: 18,
            currentSemester: '1-1',
          },
        },
      },
    });
  }

  // Create Semesters
  const semesterData = [
    { name: '1-1', displayName: '1st Year 1st Semester', year: 1, term: 1, isCurrent: true, isActive: true },
    { name: '1-2', displayName: '1st Year 2nd Semester', year: 1, term: 2, isCurrent: false, isActive: false },
    { name: '2-1', displayName: '2nd Year 1st Semester', year: 2, term: 1, isCurrent: false, isActive: false },
    { name: '2-2', displayName: '2nd Year 2nd Semester', year: 2, term: 2, isCurrent: false, isActive: false },
    { name: '3-1', displayName: '3rd Year 1st Semester', year: 3, term: 1, isCurrent: false, isActive: false },
    { name: '3-2', displayName: '3rd Year 2nd Semester', year: 3, term: 2, isCurrent: false, isActive: false },
    { name: '4-1', displayName: '4th Year 1st Semester', year: 4, term: 1, isCurrent: false, isActive: false },
    { name: '4-2', displayName: '4th Year 2nd Semester', year: 4, term: 2, isCurrent: false, isActive: false },
  ];

  const semesters: Record<string, any> = {};
  for (const sem of semesterData) {
    semesters[sem.name] = await prisma.semester.create({ data: sem });
  }

  // Create Teachers
  const [t1, t2, t3, t4, t5] = await Promise.all([
    prisma.teacher.create({ data: { name: 'Md. Abdur Razzak', designation: 'Lecturer', department: 'Computer Science and Engineering', email: 'razzak.cse@kyau.edu.bd', phone: '01738759934' } }),
    prisma.teacher.create({ data: { name: 'Md. Iftekhar Hossain Tushar', designation: 'Lecturer on Probation', department: 'Computer Science and Engineering', email: 'mdihtushar.cse@kyau.edu.bd', phone: '01738207727' } }),
    prisma.teacher.create({ data: { name: 'Mst. Anika Amzad', designation: 'Lecturer', department: 'Computer Science and Engineering', email: 'anika.cse@kyau.edu.bd', phone: '+8801744832245' } }),
    prisma.teacher.create({ data: { name: 'Md. Rahat Khan', designation: 'Lecturer', department: 'Computer Science and Engineering', email: 'rahat.cse@kyau.edu.bd', phone: '01521303383' } }),
    prisma.teacher.create({ data: { name: 'Ishrat Zahan Raka', designation: 'Lecturer', department: 'Computer Science and Engineering', email: 'ishrat.cse@kyau.edu.bd', phone: '01752473694' } }),
  ]);

  // Create Courses for 3-1
  const semester31Id = semesters['3-1'].id;
  const courses = await Promise.all([
    prisma.course.create({ data: { code: 'CSE 0613-3101', name: 'Database Management System', credit: 3.0, semesterId: semester31Id, teacherId: t1.id, description: 'Relational database concepts, SQL, ER modeling, normalization, transaction management, and indexing.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3102', name: 'Database Management System Lab', credit: 1.5, semesterId: semester31Id, teacherId: t1.id, description: 'Practical SQL queries, MySQL/PostgreSQL schema design, stored procedures, and triggers.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3103', name: 'Operating System', credit: 3.0, semesterId: semester31Id, teacherId: t2.id, description: 'Process management, CPU scheduling, memory management, file systems, and concurrency control.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3104', name: 'Operating System Lab', credit: 1.5, semesterId: semester31Id, teacherId: t2.id, description: 'Linux bash scripting, system calls, multi-threading, IPC, and process synchronization labs.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3105', name: 'Theory of Computation', credit: 3.0, semesterId: semester31Id, teacherId: t3.id, description: 'Automata theory, regular expressions, context-free grammars, Turing machines, and decidability.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3107', name: 'Microprocessor, Microcontroller and Embedded Systems', credit: 3.0, semesterId: semester31Id, teacherId: t4.id, description: '8086 architecture, assembly language, 8051/Arduino/ESP32 microcontrollers, and embedded interfacing.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3108', name: 'Microprocessor, Microcontroller and Embedded Systems Lab', credit: 1.5, semesterId: semester31Id, teacherId: t4.id, description: 'Assembly programming, proteus simulation, microcontroller sensor interfacing, and hardware labs.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3109', name: 'System Analysis and Design', credit: 3.0, semesterId: semester31Id, teacherId: t3.id, description: 'SDLC, requirement engineering, UML modeling, system architectural design, and software testing.' } }),
    prisma.course.create({ data: { code: 'CSE 0613-3111', name: 'Data Communication', credit: 3.0, semesterId: semester31Id, teacherId: t5.id, description: 'Data transmission signals, modulation, multiplexing, error detection/correction, and physical layer standards.' } }),
  ]);

  // Get CR user for publishing
  const crUser = await prisma.user.findFirst({ where: { role: 'CR' } });
  if (!crUser) throw new Error('CR user not found');

  // Create Assignments
  await Promise.all([
    prisma.assignment.create({
      data: {
        courseId: courses[1].id, // Programming Fundamentals
        publishedById: crUser.id,
        title: 'Assignment 1: Basic C Programming',
        description: 'Write a C program that reads 5 integers from the user and finds the maximum, minimum, sum, and average. Use functions for each operation.',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        totalMarks: 100,
        status: 'PUBLISHED',
        allowLate: false,
      },
    }),
    prisma.assignment.create({
      data: {
        courseId: courses[3].id, // Calculus
        publishedById: crUser.id,
        title: 'Assignment 1: Limits and Continuity',
        description: 'Solve the given problems on limits, continuity, and L\'Hopital\'s rule. Show all working steps clearly.',
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        totalMarks: 50,
        status: 'PUBLISHED',
        allowLate: true,
        latePenalty: 20,
      },
    }),
  ]);

  // Create Notices
  await Promise.all([
    prisma.notice.create({
      data: {
        publishedById: crUser.id,
        title: 'Welcome to CSE 18th Batch Academic Portal!',
        content: 'Dear students, welcome to the official academic portal for CSE 18th Batch, KYAU. This portal will be your central hub for all academic activities. Please complete your profile and keep checking for updates.',
        type: 'BATCH',
        isPinned: true,
      },
    }),
    prisma.notice.create({
      data: {
        publishedById: crUser.id,
        title: 'Quiz Notice: Programming Fundamentals - Chapter 1 & 2',
        content: 'A quiz will be held on Programming Fundamentals covering Chapters 1 and 2 (Variables, Data Types, Operators, Control Structures). Date: Next week during class time.',
        type: 'QUIZ',
        courseId: courses[1].id,
        isPinned: false,
      },
    }),
    prisma.notice.create({
      data: {
        publishedById: crUser.id,
        title: 'Class Postponed: Calculus I - This Thursday',
        content: 'Please note that the Calculus I class scheduled for this Thursday has been postponed. The class will be rescheduled. Check for updates.',
        type: 'COURSE',
        courseId: courses[3].id,
        isPinned: false,
      },
    }),
    prisma.notice.create({
      data: {
        publishedById: crUser.id,
        title: 'Eid Holiday Notice',
        content: 'The university will be closed for Eid holidays. Classes will resume after the holiday. Please check the exam routine.',
        type: 'HOLIDAY',
        isPinned: false,
      },
    }),
    prisma.notice.create({
      data: {
        publishedById: crUser.id,
        title: 'Freshers Welcome Event 2024',
        content: 'The CSE Department is organizing a grand welcome event for the 18th Batch. All students must attend. Date: To be announced.',
        type: 'EVENT',
        isPinned: false,
      },
    }),
  ]);

  // Create Weekly Routine for 1-1 semester
  const routineData = [
    // Saturday
    { type: 'WEEKLY' as const, dayOfWeek: 0, startTime: '08:00', endTime: '09:30', courseId: courses[0].id, teacherName: 'Dr. Mohammed Aktaruzzaman', roomNumber: 'CSE-101' },
    { type: 'WEEKLY' as const, dayOfWeek: 0, startTime: '09:30', endTime: '11:00', courseId: courses[3].id, teacherName: 'Tahira Khanam', roomNumber: 'CSE-101' },
    { type: 'WEEKLY' as const, dayOfWeek: 0, startTime: '11:00', endTime: '12:30', courseId: courses[4].id, teacherName: 'Physics Teacher', roomNumber: 'PHY-Lab' },
    // Sunday
    { type: 'WEEKLY' as const, dayOfWeek: 1, startTime: '08:00', endTime: '09:30', courseId: courses[1].id, teacherName: 'Md. Ariful Islam', roomNumber: 'CSE-102' },
    { type: 'WEEKLY' as const, dayOfWeek: 1, startTime: '09:30', endTime: '11:00', courseId: courses[5].id, teacherName: 'English Teacher', roomNumber: 'ARTS-201' },
    // Monday
    { type: 'WEEKLY' as const, dayOfWeek: 2, startTime: '08:00', endTime: '09:30', courseId: courses[0].id, teacherName: 'Dr. Mohammed Aktaruzzaman', roomNumber: 'CSE-101' },
    { type: 'WEEKLY' as const, dayOfWeek: 2, startTime: '09:30', endTime: '12:30', courseId: courses[2].id, teacherName: 'Md. Ariful Islam', roomNumber: 'LAB-1', notes: 'Lab Session' },
    // Tuesday
    { type: 'WEEKLY' as const, dayOfWeek: 3, startTime: '08:00', endTime: '09:30', courseId: courses[3].id, teacherName: 'Tahira Khanam', roomNumber: 'CSE-101' },
    { type: 'WEEKLY' as const, dayOfWeek: 3, startTime: '09:30', endTime: '11:00', courseId: courses[1].id, teacherName: 'Md. Ariful Islam', roomNumber: 'CSE-102' },
    // Wednesday
    { type: 'WEEKLY' as const, dayOfWeek: 4, startTime: '08:00', endTime: '09:30', courseId: courses[4].id, teacherName: 'Physics Teacher', roomNumber: 'PHY-201' },
    { type: 'WEEKLY' as const, dayOfWeek: 4, startTime: '09:30', endTime: '11:00', courseId: courses[5].id, teacherName: 'English Teacher', roomNumber: 'ARTS-201' },
    // Thursday
    { type: 'WEEKLY' as const, dayOfWeek: 5, startTime: '08:00', endTime: '09:30', courseId: courses[0].id, teacherName: 'Dr. Mohammed Aktaruzzaman', roomNumber: 'CSE-101' },
    { type: 'WEEKLY' as const, dayOfWeek: 5, startTime: '09:30', endTime: '11:00', courseId: courses[3].id, teacherName: 'Tahira Khanam', roomNumber: 'CSE-101' },
  ];

  for (const r of routineData) {
    await prisma.routine.create({ data: r });
  }

  // Create Events
  await Promise.all([
    prisma.event.create({
      data: {
        title: 'Freshers Welcome 2024 - CSE 18th Batch',
        description: 'Grand welcome event for the newly admitted CSE 18th Batch students. Senior students will introduce the department, faculty, and academic activities.',
        eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        venue: 'KYAU Auditorium',
        isRegistrationOpen: true,
        registrationDeadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.event.create({
      data: {
        title: 'Programming Contest - Intra-Batch',
        description: 'An exciting programming contest open to all CSE 18th Batch students. Prizes for top 3 contestants. Language: C, C++, Python.',
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        venue: 'CSE Lab, Room 201',
        isRegistrationOpen: true,
        registrationDeadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  // Create System Settings
  const settings = [
    { key: 'site_name', value: 'CSE 18th Batch Academic Portal', type: 'string', group: 'general' },
    { key: 'university_name', value: 'Khwaja Yunus Ali University', type: 'string', group: 'general' },
    { key: 'department_name', value: 'Computer Science and Engineering', type: 'string', group: 'general' },
    { key: 'batch_number', value: '18', type: 'number', group: 'general' },
    { key: 'allow_registration', value: 'true', type: 'boolean', group: 'auth' },
    { key: 'otp_expires_minutes', value: '5', type: 'number', group: 'auth' },
    { key: 'max_file_size_mb', value: '10', type: 'number', group: 'files' },
    { key: 'current_semester', value: '1-1', type: 'string', group: 'academic' },
  ];
  await Promise.all(settings.map(s => prisma.systemSetting.create({ data: s })));

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created: 1 Admin, 1 CR, 1 Co-CR, ${students.length - 2} Students`);
  console.log('📚 Created: 8 Semesters, 3 Teachers, 6 Courses, 2 Assignments, 5 Notices, Routine, 2 Events');
  console.log('\n🔑 Login credentials:');
  console.log('  Admin: admin@kyau.edu.bd / Admin@12345');
  console.log('  CR: 06224205101005@student.kyau.edu.bd / Student@12345');
  console.log('  Co-CR: 06224205101001@student.kyau.edu.bd / Student@12345');
  console.log('  Student: 06224205101002@student.kyau.edu.bd / Student@12345');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
