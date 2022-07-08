const httpStatus = require('../helpers/http.status.codes');

const MIN_NAME_LENGTH = 5;

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(
      httpStatus.HTTP_STATUS_BAD_REQUEST,
    ).json({ message: '"name" is required' });
  }

  if (name.length < MIN_NAME_LENGTH) {
    return res.status(
      httpStatus.HTTP_STATUS_INVALID_ARGUMENT,
    ).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const validateQuery = (req, res, next) => {
  const { q } = req.body;
  if (!q) {
    return res.status(
      httpStatus.HTTP_STATUS_BAD_REQUEST,
    ).json({ message: '"q" is required' });
  }

  next();
};

module.exports = { validateName, validateQuery };