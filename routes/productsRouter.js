const express = require('express');
const productsController = require('../controllers/productsController');
const validation = require('../middlewares/validation');

const router = express.Router();

router
  .get('/', productsController.getAll)
  .get('/:id', productsController.getById)
  .post('/', validation.validateName, productsController.insertIntoDatabase)
  .put(
    '/:id', validation.validateName, productsController.updateById,
  )
  .delete('/:id', productsController.deleteById);

module.exports = router;