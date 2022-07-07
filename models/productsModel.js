const connection = require('../helpers/connection');

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

module.exports = { getAll, getById };