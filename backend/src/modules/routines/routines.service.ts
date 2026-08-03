import prisma from '../../config/database';

export class RoutinesService {
  async getAll() { return prisma.routine.findMany(); }
}

export const routinesService = new RoutinesService();
