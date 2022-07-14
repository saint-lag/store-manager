const salesServices = require('../services/salesServices');

const httpStatus = require('../helpers/http.status.codes');

const insertSalesIntoDatabase = async (req, res) => {
  const sales = req.body;
  try {
    const result = await salesServices.insertSalesIntoDatabase(sales);

    if (!result) {
      return res
        .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: 'Internal Server Error' });
    }

    return res.status(httpStatus.HTTP_STATUS_CREATED).json({ message: result });
  } catch (err) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: 'Internal Server Error' });
  }
};

module.exports = { insertSalesIntoDatabase };