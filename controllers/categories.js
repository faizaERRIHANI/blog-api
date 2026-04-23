const { Category } = require('../models');

// GET /categories
async function getAll(req, res, next) {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

// POST /categories
async function create(req, res, next) {
  try {
    const { nom, description } = req.body;

    const category = await Category.create({
      nom,
      description
    });

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, create };