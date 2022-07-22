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

const salesForEachPromises = async (sales) => sales.map(async (s) => {
  const productIdValidation = await validateProductId(s.productId);
  const quantityValidation = validateQuantity(s.quantity);
  return ({ productIdValidation, quantityValidation });
});

const salesForEach = async (sales) => {
  const resultArr = { statusCode: null, message: null };
  const resulter = (obj) => {
    resultArr.statusCode = obj.statusCode;
    resultArr.message = obj.message;
  };
  const promises = await salesForEachPromises(sales);
  await Promise.all(promises).then((arr) => arr.map((obj) => {
    if (obj.productIdValidation) {
      resulter(obj.productIdValidation); return resultArr;
    } if (obj.quantityValidation) {
      resulter(obj.quantityValidation); return obj.resultArr;
    }
    return null;
  }));
  return resultArr || { statusCode: null, message: null };
};

module.exports = { validateSalesLenght, salesForEach };