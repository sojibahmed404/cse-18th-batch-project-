import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', notificationsController.getAll);

export default router;
