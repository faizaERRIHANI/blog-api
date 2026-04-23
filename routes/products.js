const express = require('express');
const router = express.Router();

const products = require('../controllers/products');
const { validerProduct } = require('../middlewares/validators/product');
const validate = require('../middlewares/validate');

router.get('/', products.getAll);
router.get('/:id', products.getById);

router.post('/', validerProduct, validate, products.create);
router.put('/:id', products.update);
router.delete('/:id', products.remove);

module.exports = router;