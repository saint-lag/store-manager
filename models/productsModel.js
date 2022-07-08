const connection = require('../helpers/connection');

const DATABASE = 'StoreManager';

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

const updateById = async (name, id) => {
  const query = `UPDATE ${DATABASE}.products SET name = ? WHERE id = ?`;
  const [rows] = await connection.execute(query, [name, id]);
  return rows;
};

const deleteById = async (id) => { 
  const query = `DELETE FROM ${DATABASE}.products WHERE id = ?`;
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

const searchByName = async (name) => { 
  const query = `SELECT * FROM ${DATABASE}.products WHERE name LIKE ?`;
  const [rows] = await connection.execute(query, [`%${name}%`]);
  return rows;
};

const insert = async (name) => { 
  const query = `INSERT INTO ${DATABASE}.products`;
  return { name, query };
};

module.exports = { getAll, getById, updateById, deleteById, searchByName, insert };