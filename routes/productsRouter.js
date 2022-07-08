const express = require('express');
const productsController = require('../controllers/productsController');
const validation = require('../middlewares/validation');

const router = express.Router();

router
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', validation.validateName, productsController.insertIntoDatabase);

module.exports = router;