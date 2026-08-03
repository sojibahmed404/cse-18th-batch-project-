import prisma from '../../config/database';

export class TeachersService {
  async getAll() { return prisma.teacher.findMany(); }
}

export const teachersService = new TeachersService();
