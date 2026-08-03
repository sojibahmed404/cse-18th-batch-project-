import prisma from '../../config/database';

export class EventsService {
  async getAll() { return prisma.event.findMany(); }
}

export const eventsService = new EventsService();
