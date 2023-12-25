import Joi from 'joi';

export default {
  createTweet: Joi.object({
    text: Joi.string().required(),
  }),
  updateTweet: Joi.object({
    text: Joi.string().required(),
  }),
};
