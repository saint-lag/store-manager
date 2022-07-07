const productsModel = require('../models/productsModel');
//const httpStatus = require('../helpers/http.status.codes');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result || null;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  return result || null;
};

module.exports = { getAll, getById };