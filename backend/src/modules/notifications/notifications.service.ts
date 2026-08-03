import prisma from '../../config/database';

export class NotificationsService {
  async getAll() { return prisma.notification.findMany(); }
}

export const notificationsService = new NotificationsService();
