import { Router } from 'express';
import { searchController } from './search.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();
router.use(authenticate);
router.get('/', searchController.getAll);

export default router;
