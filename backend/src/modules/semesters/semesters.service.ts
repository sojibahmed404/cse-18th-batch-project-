import prisma from '../../config/database';

export class SemestersService {
  async getAll() { return prisma.semester.findMany(); }
}

export const semestersService = new SemestersService();
