const connection = require('../helpers/connection');

const { DATABASE } = require('../helpers');

const getAll = async () => {
  const query = `SELECT * FROM ${DATABASE}.products ORDER BY id ASC`;
  const [rows] = await connection.execute(query);
  return rows;
};

const getById = async (id) => {
  const query = `SELECT * FROM ${DATABASE}.products WHERE id = ?`;
  const [rows] = await connection.execute(query, [id]);
  return rows[0];
};

const deleteById = async (id) => {
  const query = `DELETE FROM ${DATABASE}.products WHERE id = ?`;
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

const updateById = async (id, name) => {
  const query = `UPDATE ${DATABASE}.products SET name = ? WHERE id = ?`;
  const [rows] = await connection.execute(query, [name, id]);
  return rows;
};

const searchByName = async (name) => {
  const query = `SELECT * FROM ${DATABASE}.products WHERE name LIKE ?`;
  const [rows] = await connection.execute(query, [`%${name}%`]);
  return rows;
};

const insertIntoDatabase = async (name) => {
  const query = `INSERT INTO ${DATABASE}.products (name) VALUES (?)`;
  const [rows] = await connection.execute(query, [name]);
  return rows;
};

const searchProduct = async (searchTerm) => {
  const query = `SELECT * FROM ${DATABASE}.products WHERE name LIKE ?`;
  const [rows] = await connection.execute(query, [`%${searchTerm}%`]);
  return rows;
};

module.exports = {
  getAll,
  getById,
  updateById,
  deleteById,
  searchByName,
  insertIntoDatabase,
  searchProduct,
};