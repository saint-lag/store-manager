const express = require('express');
const salesController = require('../controllers/salesController');
const validation = require('../middlewares/validation');

const router = express.Router();

router
  .post('/', validation.validateSales, salesController.insertSalesIntoDatabase)
  .get('/:id', validation.validateSaleId, salesController.getSaleById);

module.exports = router;