const router = require('express').Router();
const { userValidator, userAvatarValidator, paramsValidator } = require('../middlewares/joi-schemas');

const {
  getUsers,
  findUser,
  updateUserInfo,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', paramsValidator, findUser);
router.patch('/me', userValidator, updateUserInfo);
router.patch('/me/avatar', userAvatarValidator, updateUserAvatar);

module.exports = router;
