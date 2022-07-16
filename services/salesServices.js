const salesModel = require('../models/salesModel');
// const httpStatus = require('../helpers/http.status.codes');

const insertSaleIntoDatabase = async (saleId, sale) => {
  const { productId, quantity } = sale;
  const result = await salesModel.insertSaleIntoDatabase(saleId, productId, quantity);
  return result;
};

const insertSalesIntoDatabase = async (sales) => {
  await salesModel.generateNewSaleId();
  const saleId = await salesModel.getLastSaleId();
  const { id } = saleId[0];
  sales.forEach(async (s) => insertSaleIntoDatabase(id, s));

  return { id, itemsSold: sales };
};

module.exports = { insertSalesIntoDatabase };