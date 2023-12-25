import Joi from 'joi';

export default {
  followUser: Joi.object({
    userId: Joi.string().required(),
    flag: Joi.boolean().required(),
  }),
};
