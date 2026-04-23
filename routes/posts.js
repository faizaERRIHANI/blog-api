const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.sequelize');
const { validerPost } = require('../middlewares/validators/post');
const validate = require('../middlewares/validate');

// GET
router.get('/', posts.getAll);
router.get('/:id', posts.getById);

// POST avec validation
router.post('/', validerPost, validate, posts.create);

// DELETE
router.delete('/:id', posts.remove);

module.exports = router;