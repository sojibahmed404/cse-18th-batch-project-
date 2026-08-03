import prisma from '../../config/database';

export class SearchService {
  async search(query: string) {
    if (!query || query.trim().length === 0) {
      return { courses: [], notices: [], assignments: [], teachers: [] };
    }

    const q = query.trim();

    const [courses, notices, assignments, teachers] = await Promise.all([
      prisma.course.findMany({
        where: {
          deletedAt: null,
          OR: [
            { name: { contains: q } },
            { code: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 10,
      }),
      prisma.notice.findMany({
        where: {
          deletedAt: null,
          OR: [
            { title: { contains: q } },
            { content: { contains: q } },
          ],
        },
        take: 10,
      }),
      prisma.assignment.findMany({
        where: {
          deletedAt: null,
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 10,
      }),
      prisma.teacher.findMany({
        where: {
          deletedAt: null,
          OR: [
            { name: { contains: q } },
            { designation: { contains: q } },
            { email: { contains: q } },
          ],
        },
        take: 10,
      }),
    ]);

    return { courses, notices, assignments, teachers };
  }

  async getAll(query?: string) {
    return this.search(query || '');
  }
}

export const searchService = new SearchService();
