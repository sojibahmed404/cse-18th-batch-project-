import { Router } from 'express';
import { analyticsController } from './analytics.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', analyticsController.getAll);

export default router;
