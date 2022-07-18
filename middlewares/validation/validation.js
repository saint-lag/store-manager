const httpStatus = require('../../helpers/http.status.codes');
const salesModel = require('../../models/salesModel');
const utils = require('./utils');

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

const validateSales = async (req, res, next) => {
  const sales = req.body;
  const result = utils.validateSalesLenght(sales);
  if (result) return res.status(result.statusCode).json({ message: result.message });

  const invalidResponse = await utils.salesForEach(sales);

  if (invalidResponse.statusCode) {
    return res.status(invalidResponse.statusCode)
      .json({ message: invalidResponse.message });
  }
  next();
};

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesModel.getSaleById(id);
  if (sale.length === 0) {
    return res.status(httpStatus.HTTP_STATUS_NOT_FOUND)
      .json({ message: 'Sale not found' });
  }
  next();
};

module.exports = { validateName, validateSales, validateSaleId };