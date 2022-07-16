const salesModel = require('../models/salesModel');
// const httpStatus = require('../helpers/http.status.codes');

const getSaleById = async (id) => {
  const result = await salesModel.getSaleById(id);
  return result[0] || null;
};

const getSaleProductsById = async (id) => {
  const result = await salesModel.getSaleProductsById(id);
  return result || null;
};

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

module.exports = { insertSalesIntoDatabase, getSaleById, getSaleProductsById };