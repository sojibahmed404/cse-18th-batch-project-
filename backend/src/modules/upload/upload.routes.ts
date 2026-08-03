import { Router } from 'express';
import { uploadController } from './upload.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', uploadController.getAll);

export default router;
