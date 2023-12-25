import { Router } from 'express';
const router = Router();
import auth from './../../middlewares/auth.middleware';
import userController from './users.controller';

router.get('/', auth, userController.getAll);
router.put('/follow', auth, userController.followUser);

export default router;
