import { Router } from 'express';
import { noticesController } from './notices.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', noticesController.getAll);

export default router;
