import { Router } from 'express';
import asyncHandler from './../../middlewares/asyncHandler.middleware';
import validate from './../../middlewares/validator.middleware';
import authController from './auth.controller';
import authValidation from './auth.validation';
const router = Router();

router.post('/register', validate('body', authValidation.register), asyncHandler(authController.register));
router.post('/login', validate('body', authValidation.login), asyncHandler(authController.login));

export default router;
