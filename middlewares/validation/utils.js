const httpStatus = require('../../helpers/http.status.codes');
const productsModel = require('../../models/productsModel');

const MIN_SALE_QUANTITY = 0;

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

module.exports = { validateSalesLenght, salesForEach };