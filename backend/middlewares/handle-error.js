const { SERVER_ERROR } = require('../constants/errors');

// eslint-disable-next-line no-unused-vars
const handleError = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;

  res.status(statusCode).send({ message: statusCode === SERVER_ERROR ? 'На сервере произошла ошибка' : message });
};

module.exports = handleError;
