const connection = require('../helpers/connection');

const { DATABASE } = '../helpers';

const generateNewSaleId = async () => {
  const query = `INSERT INTO ${DATABASE}.sales (date) VALUES (NOW())`;
  const [rows] = await connection.execute(query);
  return rows;
};

const insertSaleIntoDatabase = async (saleId, productId, quantity) => {
  const query = `INSERT INTO ${DATABASE}.sales (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  const [rows] = await connection.execute(query, [saleId, productId, quantity]);
  return rows;
};

module.exports = { insertSaleIntoDatabase, generateNewSaleId };