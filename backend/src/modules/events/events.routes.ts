import { Router } from 'express';
import { eventsController } from './events.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', eventsController.getAll);

export default router;
