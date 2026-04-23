const { Post, User, Comment } = require('../models');

// GET /posts
async function getAll(req, res, next) {
  try {
    const posts = await Post.findAll({
      where: { publie: true },
      include: [{ model: User, as: 'user', attributes: ['nom'] }],
      order: [['created_at', 'DESC']]
    });

    res.json(posts);
  } catch (err) {
    next(err);
  }
}

// GET /posts/:id
async function getById(req, res, next) {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['nom'] },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, as: 'user', attributes: ['nom'] }]
        }
      ]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post introuvable' });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
}

// POST /posts
async function create(req, res, next) {
  try {
    const { titre, contenu, userId, publie } = req.body;

    const post = await Post.create({
      titre,
      contenu,
      userId,
      publie: publie || false
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}

// DELETE /posts/:id
async function remove(req, res, next) {
  try {
    const count = await Comment.count({
      where: { postId: req.params.id }
    });

    if (count > 0) {
      return res.status(409).json({
        erreur: 'Impossible de supprimer un post avec des commentaires'
      });
    }

    await Post.destroy({
      where: { id: req.params.id }
    });

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getById, create, remove };