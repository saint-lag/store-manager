const salesModel = require('../models/salesModel');
// const httpStatus = require('../helpers/http.status.codes');

const insertSaleIntoDatabase = async (sale) => {
  const { productId, quantity } = sale;
  await salesModel.generateNewSaleId();
  const saleId = await salesModel.getLastSaleId();
  const result = await salesModel.insertSaleIntoDatabase(saleId, productId, quantity);
  return result;
};

const insertSalesIntoDatabase = async (sales) => {
  await sales.forEach(async (s) => insertSaleIntoDatabase(s));

  return sales || [];
};

module.exports = { insertSalesIntoDatabase };