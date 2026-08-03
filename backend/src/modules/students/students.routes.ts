import { Router } from 'express';
import { studentsController } from './students.controller';
import { validate } from '../../middleware/validate.middleware';
import { authenticate } from '../../middleware/auth.middleware';
import { updateProfileSchema, updateProfilePictureSchema } from './students.schema';

const router = Router();

router.use(authenticate);

router.get('/me', studentsController.getMyProfile);
router.patch('/me', validate(updateProfileSchema), studentsController.updateProfile);
router.patch('/me/picture', validate(updateProfilePictureSchema), studentsController.updateProfilePicture);

router.get('/', studentsController.getAllStudents);
router.get('/:studentId', studentsController.getStudentByStudentId);

export default router;
