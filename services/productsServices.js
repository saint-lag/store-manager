const productsModel = require('../models/productsModel');
const httpStatus = require('../helpers/http.status.codes');

const getAll = async () => {
  const result = await productsModel.getAll();
  return result || null;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  return result || null;
};

const deleteById = async (id) => { 
  const product = await getById(id);

  if (!product) return { message: 'Product not found', code: httpStatus.HTTP_STATUS_NOT_FOUND };

  const result = await productsModel.deleteById(id);
  return result || null;
};

const updateById = async (id, name) => {
  const product = await getById(id);

  if (!product) return { message: 'Product not found', code: httpStatus.HTTP_STATUS_NOT_FOUND };
    
  const result = await productsModel.updateById(id, name);
  return result || null;
};

const insertIntoDatabase = async (name) => {
  const result = await productsModel.insertIntoDatabase(name);
  return result || null;
};

module.exports = { getAll, getById, updateById, insertIntoDatabase, deleteById };