const { WRONG_DATA } = require('../constants/errors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = WRONG_DATA;
  }
}

module.exports = BadRequestError;
