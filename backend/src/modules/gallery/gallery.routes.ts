import { Router } from 'express';
import { galleryController } from './gallery.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', galleryController.getAll);

export default router;
