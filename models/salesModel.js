const connection = require('../helpers/connection');

const { DATABASE } = require('../helpers');

const generateNewSaleId = async () => {
  const query = `INSERT INTO ${DATABASE}.sales (date) VALUES (CURRENT_TIMESTAMP())`;
  const [rows] = await connection.execute(query);
  return rows;
};

const getLastSaleId = async () => {
  const query = `SELECT id FROM ${DATABASE}.sales ORDER BY id DESC LIMIT 1`;
  const [rows] = await connection.execute(query);
  return rows;
};

const getSaleById = async (id) => {
  const query = `SELECT * FROM ${DATABASE}.sales WHERE id = ? ORDER BY id ASC LIMIT 1`;
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

const getSaleProductsById = async (id) => {
  const query = `SELECT * FROM ${DATABASE}.sales_products WHERE sale_id = ?`;
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

const getAllSales = async () => {
  const query = `SELECT * FROM ${DATABASE}.sales`;
  const [rows] = await connection.execute(query);
  return rows;
};

const getAllSalesProducts = async () => {
  const query = `SELECT * FROM ${DATABASE}.sales_products`;
  const [rows] = await connection.execute(query);
  return rows;
};

const insertSaleIntoDatabase = async (saleId, productId, quantity) => {
  const query = `INSERT INTO ${DATABASE}.sales_products `
    + '(sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [rows] = await connection.execute(query, [saleId, productId, quantity]);
  return rows;
};

const deleteSaleById = async (id) => { 
  const query = `DELETE FROM ${DATABASE}.sales WHERE id = ?`;
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

const updateSaleById = async (productId, saleId, quantity) => { 
  const query = `UPDATE ${DATABASE}.sales_products
   SET quantity = ? WHERE product_id = ? AND sale_id = ?`;
  const [rows] = await connection.execute(query, [quantity, productId, saleId]);
  return rows;
};

module.exports = {
  insertSaleIntoDatabase,
  generateNewSaleId,
  getLastSaleId,
  getSaleById,
  getSaleProductsById,
  getAllSales,
  getAllSalesProducts,
  deleteSaleById,
  updateSaleById,
};