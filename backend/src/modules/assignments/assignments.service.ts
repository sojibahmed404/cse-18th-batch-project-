import prisma from '../../config/database';

export class AssignmentsService {
  async getAll() { return prisma.assignment.findMany(); }
}

export const assignmentsService = new AssignmentsService();
