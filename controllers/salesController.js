const salesServices = require('../services/salesServices');

const httpStatus = require('../helpers/http.status.codes');

const { INTERNAL_SERVER_ERROR } = require('../helpers');

const salesProductsMap = async (salesProducts, sales) => salesProducts.map((obj) => {
  const { date } = sales.find((s) => s.id === obj.sale_id);

  return {
    saleId: obj.sale_id,
    date,
    productId: obj.product_id,
    quantity: obj.quantity,
  };
});

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesServices.getAllSales();
    const salesProducts = await salesServices.getAllSalesProducts();
    const result = await salesProductsMap(salesProducts, sales);

    if (!result || result === []) {
      return res
        .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
    }

    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const { date } = await salesServices.getSaleById(id);
    const salesProducts = await salesServices.getSaleProductsById(id);

    const result = salesProducts.map((p) => ({
      date, productId: p.product_id, quantity: p.quantity,
    }));

    if (!result || result === []) {
      return res
        .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
    }

    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const insertSalesIntoDatabase = async (req, res) => {
  const sales = req.body;
  try {
    const result = await salesServices.insertSalesIntoDatabase(sales);

    if (!result) {
      return res
        .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
    }

    return res.status(httpStatus.HTTP_STATUS_CREATED).json(result);
  } catch (err) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await salesServices.deleteSaleById(id);

    if (!result) {
      return res
        .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
    }

    return res.status(httpStatus.HTTP_STATUS_NO_CONTENT).send();
  } catch (errr) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;
  try {
    const result = await salesServices.updateSaleById(sales, id);

    if (!result) {
      return res
        .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
    }

    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  insertSalesIntoDatabase,
  getSaleById,
  getAllSales,
  deleteSaleById,
  updateSaleById,
};