import { Router } from 'express';
import { semestersController } from './semesters.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', semestersController.getAll);

export default router;
