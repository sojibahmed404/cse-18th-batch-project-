import { Router } from 'express';
import { assignmentsController } from './assignments.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', assignmentsController.getAll);

export default router;
