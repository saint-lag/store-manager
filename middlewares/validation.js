const httpStatus = require('../helpers/http.status.codes');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const MIN_NAME_LENGTH = 5;
const MIN_SALE_QUANTITY = 0;

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

const validateQuantity = (quantity) => {
  if (!quantity && quantity !== 0) {
    return {
      statusCode: httpStatus.HTTP_STATUS_BAD_REQUEST, message: '"quantity" is required',
    };
  }
  if (Number(quantity) <= MIN_SALE_QUANTITY) {
    return {
      statusCode: httpStatus.HTTP_STATUS_INVALID_ARGUMENT,
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  return null;
};

const validateProductId = async (productId) => {
  if (!productId) {
    return {
      statusCode: httpStatus.HTTP_STATUS_BAD_REQUEST, message: '"productId" is required',
    };
  }
  const product = await productsModel.getById(productId);
  if (!product) {
    return {
      statusCode: httpStatus.HTTP_STATUS_NOT_FOUND,
      message: 'Product not found',
    };
  }
  return null;
};

const validateSalesLenght = (sales) => {
  if (Object.entries(sales).length === 0) {
    return {
      statusCode: httpStatus.HTTP_STATUS_BAD_REQUEST, message: 'BAD REQUEST',
    };
  }
  return false;
};

const salesForEach = async (sales) => {
  const result = { statusCode: null, message: null };
  const resulter = (obj) => {
    result.statusCode = obj.statusCode;
    result.message = obj.message;
  };
  for (let i = 0; i < sales.length; i += 1) {
    const { productId, quantity } = sales[i];
    const productIdValidation = await validateProductId(productId);
    const quantityValidation = validateQuantity(quantity);

    if (productIdValidation) {
      resulter(productIdValidation);
      return result;
    } if (quantityValidation) {
      resulter(quantityValidation);
      return result;
    }
  }

  return result;
};

const validateSales = async (req, res, next) => {
  const sales = req.body;
  const result = validateSalesLenght(sales);
  if (result) return res.status(result.statusCode).json({ message: result.message });

  const invalidResponse = await salesForEach(sales);

  if (invalidResponse.statusCode) {
    return res.status(invalidResponse.statusCode)
      .json({ message: invalidResponse.message });
  }
  next();
};

const validateSaleId = async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesModel.getSaleById(id);
  console.log(sale);
  if (sale.length === 0) {
    return res.status(httpStatus.HTTP_STATUS_NOT_FOUND)
      .json({ message: 'Sale not found' });
  }
  next();
};

module.exports = { validateName, validateSales, validateSaleId };