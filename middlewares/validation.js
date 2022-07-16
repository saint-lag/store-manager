const httpStatus = require('../helpers/http.status.codes');
const productsModel = require('../models/productsModel');

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
  if (!quantity) {
    return {
      statusCode: httpStatus.HTTP_STATUS_BAD_REQUEST, message: '"quantity" is required',
    };
  }
  if (quantity <= MIN_SALE_QUANTITY) {
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
  console.log(product);
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

const validateSales = async (req, res, next) => {
  const sales = req.body;
  const result = validateSalesLenght(sales);
  if (result) return res.status(result.statusCode).json({ message: result.message });
  sales.forEach(async (s) => {
    const { productId, quantity } = s;
    const productIdValidation = await validateProductId(productId);
    const quantityValidation = validateQuantity(quantity);
    if (productIdValidation) {
      const { statusCode, message } = productIdValidation;
      return res.status(statusCode).json({ message });
    } if (quantityValidation) {
      const { statusCode, message } = quantityValidation;
      return res.status(statusCode).json({ message });
    }
  });
  next();
};

module.exports = { validateName, validateSales };