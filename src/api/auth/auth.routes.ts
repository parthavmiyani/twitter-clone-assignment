import { Router } from 'express';
const router = Router();
import authController from './auth.controller';

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
