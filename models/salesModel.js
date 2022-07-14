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

const insertSaleIntoDatabase = async (saleId, productId, quantity) => {
  const query = `INSERT INTO ${DATABASE}.sales_products `
    + '(sale_id, product_id, quantity) VALUES (?, ?, ?)';
  const [rows] = await connection.execute(query, [saleId, productId, quantity]);
  return rows;
};

module.exports = { insertSaleIntoDatabase, generateNewSaleId, getLastSaleId };