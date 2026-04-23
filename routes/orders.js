const express = require('express');
const router = express.Router();

const orders = require('../controllers/orders');

router.get('/', orders.getAll);   // ✅ doit exister
router.post('/', orders.create);

module.exports = router;