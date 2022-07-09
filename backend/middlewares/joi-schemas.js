const { celebrate, Joi } = require('celebrate');
const urlRegexp = require('../constants/regexp-url');

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegexp),
  }),
});

const paramsValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const userValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegexp),
  }),
});

const userCreatingValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegexp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const authValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  cardValidator,
  paramsValidator,
  userValidator,
  userAvatarValidator,
  userCreatingValidator,
  authValidator,
};
