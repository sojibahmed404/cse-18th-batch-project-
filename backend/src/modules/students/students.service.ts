import prisma from '../../config/database';

export class StudentsService {
  async getMyProfile(userId: string) {
    const student = await prisma.student.findUnique({
      where: { userId },
      include: { user: { select: { email: true, role: true, status: true, lastLoginAt: true } } },
    });
    if (!student) throw Object.assign(new Error('Student profile not found'), { statusCode: 404 });
    return student;
  }

  async updateProfile(userId: string, data: any) {
    return prisma.student.update({
      where: { userId },
      data,
    });
  }

  async updateProfilePicture(userId: string, imageUrl: string) {
    return prisma.student.update({
      where: { userId },
      data: { profilePicture: imageUrl },
    });
  }

  async getAllStudents(page: number, limit: number, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { studentId: { contains: search } },
      ];
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        include: { user: { select: { email: true, role: true, status: true } } },
        orderBy: { studentId: 'asc' },
      }),
      prisma.student.count({ where }),
    ]);

    return { students, total };
  }

  async getStudentByStudentId(studentId: string) {
    const student = await prisma.student.findUnique({
      where: { studentId },
      include: { user: { select: { email: true, role: true, status: true } } },
    });
    if (!student) throw Object.assign(new Error('Student not found'), { statusCode: 404 });
    return student;
  }
}

export const studentsService = new StudentsService();
