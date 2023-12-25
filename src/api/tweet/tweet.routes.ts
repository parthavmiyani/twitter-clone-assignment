import { Router } from 'express';
const router = Router();
import auth from './../../middlewares/auth.middleware';
import tweetController from './tweet.controller';
import tweetValidation from './tweet.validation';
import asyncHandler from './../../middlewares/asyncHandler.middleware';
import validate from './../../middlewares/validator.middleware';

router.post('/', auth, validate('body', tweetValidation.createTweet), asyncHandler(tweetController.createTweet));
router.get('/feed', auth, asyncHandler(tweetController.getMyFeed));

router.put('/:id', auth, validate('body', tweetValidation.updateTweet), asyncHandler(tweetController.updateTweet));
router.delete('/:id', auth, asyncHandler(tweetController.deleteTweet));

export default router;
