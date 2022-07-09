const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-err');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new AuthError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-secret-code');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
