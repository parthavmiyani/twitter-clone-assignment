import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import userRoutes from './users/users.routes';
import tweetRoutes from './tweet/tweet.routes';
const router = Router();

router.get('/health', (req, res) => {
  return res.status(200).send({
    message: 'OK',
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tweet', tweetRoutes);

export default router;
