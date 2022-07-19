const productsServices = require('../services/productsServices');

const httpStatus = require('../helpers/http.status.codes');

const {
  INTERNAL_SERVER_ERROR,
  PRODUCT_NOT_FOUND,
} = require('../helpers');

const getAll = async (_req, res) => {
  try {
    const result = await productsServices.getAll();

    if (!result) res.status(httpStatus.HTTP_STATUS_NOT_FOUND).json({ message: 'Not found' });

    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({
      message: INTERNAL_SERVER_ERROR,
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
      ).json({ message: PRODUCT_NOT_FOUND });
    }
    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({
      message: INTERNAL_SERVER_ERROR,
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
      ).json({ message: INTERNAL_SERVER_ERROR });
    }

    return res.status(httpStatus.HTTP_STATUS_CREATED).json({ id: result.insertId, name });
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({ message: INTERNAL_SERVER_ERROR });
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
      ).json({ message: INTERNAL_SERVER_ERROR });
    }
    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(httpStatus.HTTP_STATUS_OK).json({ id, name });
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productsServices.deleteById(id);

    if (!result) {
      return res.status(
        httpStatus.HTTP_STATUS_INTERNAL_SERVER,
      ).json({ message: INTERNAL_SERVER_ERROR });
    }
    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(httpStatus.HTTP_STATUS_NO_CONTENT).send();
  } catch (err) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  try {
    const result = await productsServices.searchProduct(q);
    if (!result) {
      return res.status(
        httpStatus.HTTP_STATUS_INTERNAL_SERVER,
      ).json({ message: INTERNAL_SERVER_ERROR });
    }
    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (error) {
    return res.status(
      httpStatus.HTTP_STATUS_INTERNAL_SERVER,
    ).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getAll,
  getById,
  insertIntoDatabase,
  updateById,
  deleteById,
  searchProduct,
};