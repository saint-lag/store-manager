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

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return result || [];
};

const getAllSalesProducts = async () => {
  const result = await salesModel.getAllSalesProducts();
  return result || [];
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

const deleteSaleById = async (id) => {
  const result = await salesModel.deleteSaleById(id);
  return result || null;
};

const updateSaleById = async (sales, saleId) => {
  await sales.forEach(async (s) => {
    const { productId, quantity } = s;
    return salesModel.updateSaleById(productId, saleId, quantity);
  });
  const result = {
    saleId,
    itemsUpdated: sales,
  };
  return result || null;
};

module.exports = {
  insertSalesIntoDatabase,
  getSaleById,
  getSaleProductsById,
  getAllSales,
  getAllSalesProducts,
  deleteSaleById,
  updateSaleById,
};