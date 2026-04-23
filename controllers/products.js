const { Product, Category, OrderItem } = require('../models');
const { Op } = require('sequelize');

// GET /products
async function getAll(req, res, next) {
  try {
    const { category, minPrice, maxPrice, page = 1 } = req.query;

    const where = {};

    if (category) where.categoryId = category;

    if (minPrice || maxPrice) {
      where.prix = {};
      if (minPrice) where.prix[Op.gte] = minPrice;
      if (maxPrice) where.prix[Op.lte] = maxPrice;
    }

    const limit = 5;
    const offset = (page - 1) * limit;

    const products = await Product.findAll({
      where,
      include: [{ model: Category, as: 'category', attributes: ['nom'] }],
      limit,
      offset
    });

    res.json(products);

  } catch (err) {
    next(err);
  }
}

// GET /products/:id
async function getById(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: 'category', attributes: ['nom'] }]
    });

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    res.json(product);

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

// PUT /products/:id
async function update(req, res, next) {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produit introuvable' });
    }

    await product.update(req.body);

    res.json(product);

  } catch (err) {
    next(err);
  }
}

// DELETE /products/:id
async function remove(req, res, next) {
  try {
    const count = await OrderItem.count({
      where: { productId: req.params.id }
    });

    if (count > 0) {
      return res.status(409).json({
        message: 'Produit utilisé dans une commande'
      });
    }

    await Product.destroy({
      where: { id: req.params.id }
    });

    res.sendStatus(204);

  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, update, remove };