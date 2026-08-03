import { Router } from 'express';
import { coursesController } from './courses.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', coursesController.getAll);

export default router;
