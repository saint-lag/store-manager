const salesServices = require('../services/salesServices');

const httpStatus = require('../helpers/http.status.codes');

const getAllSales = async () => null;

const getSaleById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const { date } = await salesServices.getSaleById(id);
    const salesProducts = await salesServices.getSaleProductsById(id);
  
    const result = salesProducts.map((p) => ({
      date, productId: p.product_id, quantity: p.quantity,
    }));

    return res.status(httpStatus.HTTP_STATUS_OK).json(result);
  } catch (err) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: 'Internal Server Error' });
  }
};

const insertSalesIntoDatabase = async (req, res) => {
  const sales = req.body;
  try {
    const result = await salesServices.insertSalesIntoDatabase(sales);

    if (!result) {
      return res
        .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: 'Internal Server Error' });
    }
    console.log('??');
    return res.status(httpStatus.HTTP_STATUS_CREATED).json(result);
  } catch (err) {
    return res
      .status(httpStatus.HTTP_STATUS_INTERNAL_SERVER).json({ message: 'Internal Server Error' });
  }
};

module.exports = { insertSalesIntoDatabase, getSaleById, getAllSales };