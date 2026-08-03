import { Router } from 'express';
import { routinesController } from './routines.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', routinesController.getAll);

export default router;
