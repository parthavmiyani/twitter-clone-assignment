import Joi from 'joi';

export default {
  register: Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
