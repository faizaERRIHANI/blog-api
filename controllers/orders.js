const { Order, OrderItem, Product } = require('../models');

// GET /orders
async function getAll(req, res, next) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['nom', 'prix']
            }
          ]
        }
      ]
    });

    res.json(orders);
  } catch (err) {
    next(err);
  }
}

// POST /orders
async function create(req, res, next) {
  try {
    res.json({ message: "create works" });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, getAll }; // ✅ IMPORTANT