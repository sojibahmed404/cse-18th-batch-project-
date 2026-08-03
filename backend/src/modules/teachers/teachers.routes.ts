import { Router } from 'express';
import { teachersController } from './teachers.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', teachersController.getAll);

export default router;
