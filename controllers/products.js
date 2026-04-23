const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// GET /products
async function getAll(req, res, next) {
  try {
    const { category, minPrice, maxPrice, page = 1 } = req.query;

    const where = {};

    if (category) {
      where.categoryId = category;
    }

    if (minPrice || maxPrice) {
      where.prix = {};
      if (minPrice) where.prix[Op.gte] = minPrice;
      if (maxPrice) where.prix[Op.lte] = maxPrice;
    }

    const limit = 5;
    const offset = (page - 1) * limit;

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['nom']
        }
      ],
      limit,
      offset
    });

    res.json(products);

  } catch (err) {
    next(err);
  }
}

// POST /products
async function create(req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

// 🔥 TRÈS IMPORTANT (c’est ça le problème)
module.exports = {
  getAll,
  create
};