import prisma from '../../config/database';

export class AnalyticsService {
  async getDashboardStats() {
    const [totalUsers, totalStudents, totalCourses, totalAssignments, totalNotices] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.student.count(),
      prisma.course.count({ where: { deletedAt: null } }),
      prisma.assignment.count({ where: { deletedAt: null } }),
      prisma.notice.count({ where: { deletedAt: null } }),
    ]);

    return {
      totalUsers,
      totalStudents,
      totalCourses,
      totalAssignments,
      totalNotices,
    };
  }

  async getAll() {
    return this.getDashboardStats();
  }
}

export const analyticsService = new AnalyticsService();
