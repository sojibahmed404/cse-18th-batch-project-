import prisma from '../../config/database';

export class GalleryService {
  async getAll() { return prisma.gallery.findMany(); }
}

export const galleryService = new GalleryService();
