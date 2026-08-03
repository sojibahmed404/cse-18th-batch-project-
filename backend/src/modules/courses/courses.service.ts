import prisma from '../../config/database';

export class CoursesService {
  async getAll() { return prisma.course.findMany(); }
}

export const coursesService = new CoursesService();
