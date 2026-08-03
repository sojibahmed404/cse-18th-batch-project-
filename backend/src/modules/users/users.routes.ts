import { Router } from 'express';
import { usersController } from './users.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate, authorize } from '../../middleware/auth.middleware';
import { logActivity } from '../../middleware/activity.middleware';
import { addUserSchema, updateRoleSchema, updateStatusSchema } from './users.schema';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/', usersController.getAllUsers);
router.post('/', validate(addUserSchema), logActivity('CREATE', 'USER'), usersController.addUser);
router.get('/:id', usersController.getUserById);
router.patch('/:id/role', validate(updateRoleSchema), logActivity('UPDATE_ROLE', 'USER'), usersController.updateUserRole);
router.patch('/:id/status', validate(updateStatusSchema), logActivity('UPDATE_STATUS', 'USER'), usersController.updateUserStatus);
router.delete('/:id', logActivity('DELETE', 'USER'), usersController.deleteUser);
router.get('/:id/logins', usersController.getLoginHistory);
router.get('/:id/activities', usersController.getActivityLogs);

export default router;
