const salesModel = require('../models/salesModel');
const httpStatus = require('../helpers/http.status.codes');

const insertSaleIntoDatabase = async (sale) => {
  const { productId, quantity } = sale;
  const saleId = salesModel.generateNewSaleId();

  if (!saleId) {
    return {
      message: 'Internal Server Error', code: httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    };
  }

  const result = salesModel.insertSaleIntoDatabase(saleId, productId, quantity);

  return result || null;
};

const insertSalesIntoDatabase = async (sales) => {
  const result = sales.map((s) => insertSaleIntoDatabase(s));
  return result || [];
};

module.exports = { insertSalesIntoDatabase };