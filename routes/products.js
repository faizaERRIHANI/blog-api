const express = require('express');
const router = express.Router();

const products = require('../controllers/products');

// 🔥 debug
console.log('DEBUG products =', products);

router.get('/', (req, res, next) => products.getAll(req, res, next));
router.post('/', (req, res, next) => products.create(req, res, next));

module.exports = router;