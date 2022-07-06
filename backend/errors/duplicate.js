const { DUPLICATE_ERROR } = require('../constants/errors');

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DUPLICATE_ERROR;
  }
}

module.exports = DuplicateError;
