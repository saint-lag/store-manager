const httpStatus = require('../helpers/http.status.codes');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(httpStatus.HTTP_STATUS_BAD_REQUEST).json({ message: '"name" is required' });
  
  next();
};

const validateQuery = (req, res, next) => {
  const { q } = req.body;
  if (!q) return res.status(httpStatus.HTTP_STATUS_BAD_REQUEST).json({ message: '"q" is required' })
  
  next();
};

module.exports = { validateName, validateQuery };