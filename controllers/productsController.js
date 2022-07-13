const productsServices = require('../services/productsServices');

const httpStatus = require('../helpers/http.status.codes');

const getAll = async (_req, res) => {
  try {
    const result = await productsServices.getAll();

    if (!result) res.status(httpStatus.HTTP_STATUS_NOT_FOUND).json({ message: 'Not found' });

    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({
      message: 'HTTP_STATUS_INTERNAL_SERVER',
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productsServices.getById(id);

    if (!result) {
      return res.status(
        httpStatus.HTTP_STATUS_NOT_FOUND,
      ).json({ message: 'Product not found' });
    }
    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({
      message: 'Internal Server Error',
    });
  }
};

const insertIntoDatabase = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await productsServices.insertIntoDatabase(name);

    if (!result) {
      return res.status(
        httpStatus.HTTP_STATUS_INTERNAL_SERVER,
      ).json({ message: 'Internal Error' });
    }

    return res.status(httpStatus.HTTP_STATUS_CREATED).json({ id: result.insertId, name });
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({ message: 'Internal Server Error' });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await productsServices.updateById(id, name);
    if (!result) {
      return res.status(
        httpStatus.HTTP_STATUS_INTERNAL_SERVER,
      ).json({ message: 'Internal Error' });
    }
    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(httpStatus.HTTP_STATUS_OK).json({ id, name });
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({ message: 'Internal Server Error' });
  }
};

const deleteById = async (req, res) => { 
  const { id } = req.params;
  try {
    const result = await productsServices.deleteById(id);

    if (!result) {
      return res.status(
        httpStatus.HTTP_STATUS_INTERNAL_SERVER,
      ).json({ message: 'Internal Error' });
    }
    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(httpStatus.HTTP_STATUS_NO_CONTENT).send();
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAll, getById, insertIntoDatabase, updateById, deleteById };