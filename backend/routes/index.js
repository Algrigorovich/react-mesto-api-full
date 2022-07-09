const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/users');
const { userCreatingValidator, authValidator } = require('../middlewares/joi-schemas');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', authValidator, login);
router.post('/signup', userCreatingValidator, createUser);
router.post('/logout', logout);
router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);

module.exports = router;
