const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  findUser,
  updateUserInfo,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');
const urlRegexp = require('../constants/regexp-url');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), findUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegexp),
  }),
}), updateUserAvatar);

module.exports = router;
