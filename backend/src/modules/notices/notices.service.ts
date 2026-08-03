import prisma from '../../config/database';

export class NoticesService {
  async getAll() { return prisma.notice.findMany(); }
}

export const noticesService = new NoticesService();
