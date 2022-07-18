const express = require('express');
const salesController = require('../controllers/salesController');
const validation = require('../middlewares/validation/validation');

const router = express.Router();

router
  .post('/', validation.validateSales, salesController.insertSalesIntoDatabase)
  .get('/', salesController.getAllSales)
  .get('/:id', validation.validateSaleId, salesController.getSaleById);

module.exports = router;