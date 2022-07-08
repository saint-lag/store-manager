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
      message: 'Product not found',
    });
  }
};

module.exports = { getAll, getById };