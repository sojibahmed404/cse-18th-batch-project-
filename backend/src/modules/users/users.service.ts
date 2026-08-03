import { Prisma } from '@prisma/client';
import prisma from '../../config/database';
import { hashPassword } from '../../utils/password';
import { env } from '../../config/env';

export class UsersService {
  async getAllUsers(page: number, limit: number, search?: string, role?: string, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { deletedAt: null };

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { student: { firstName: { contains: search } } },
        { student: { lastName: { contains: search } } },
        { student: { studentId: { contains: search } } },
      ];
    }
    if (role) where.role = role;
    if (status) where.status = status;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          role: true,
          status: true,
          isEmailVerified: true,
          createdAt: true,
          student: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { student: true },
    });
    if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });
    return user;
  }

  async createUser(data: any) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw Object.assign(new Error('Email already exists'), { statusCode: 409 });

    const hashedPassword = await hashPassword(data.password);
    const studentId = data.email.split('@')[0];

    const user = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: data.role,
          status: 'ACTIVE',
          isEmailVerified: true,
        },
      });

      await tx.student.create({
        data: {
          userId: newUser.id,
          studentId,
          firstName: data.firstName,
          lastName: data.lastName,
          department: env.DEPARTMENT_NAME,
          batch: env.BATCH_NUMBER,
          currentSemester: '1-1',
        },
      });

      return newUser;
    });

    return user;
  }

  async updateUserRole(id: string, role: string) {
    return prisma.user.update({
      where: { id },
      data: { role: role as any },
    });
  }

  async updateUserStatus(id: string, status: string) {
    return prisma.user.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async deleteUser(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'DEACTIVATED' },
    });
  }

  async getLoginHistory(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      prisma.loginLog.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.loginLog.count({ where: { userId } }),
    ]);
    return { logs, total };
  }

  async getActivityLogs(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.activityLog.count({ where: { userId } }),
    ]);
    return { logs, total };
  }
}

export const usersService = new UsersService();
