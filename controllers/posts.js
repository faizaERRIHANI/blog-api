const pool = require('../config/db');

// 🔹 GET /posts
async function getAll(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT posts.*, users.nom AS auteur
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.publie = TRUE
      ORDER BY posts.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// 🔹 GET /posts/:id
async function getById(req, res, next) {
  try {
    // récupérer le post + auteur
    const [posts] = await pool.query(`
      SELECT posts.*, users.nom AS auteur
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.id = ?
    `, [req.params.id]);

    if (posts.length === 0) {
      return res.status(404).json({ message: 'Post introuvable' });
    }

    // récupérer les commentaires + auteurs
    const [comments] = await pool.query(`
      SELECT comments.*, users.nom AS auteur
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
    `, [req.params.id]);

    res.json({
      ...posts[0],
      commentaires: comments
    });

  } catch (err) {
    next(err);
  }
}

// 🔹 POST /posts
async function create(req, res, next) {
  try {
    const { titre, contenu, user_id, publie } = req.body;

    // validation simple
    if (!titre || titre.length < 5) {
      return res.status(400).json({ error: 'Titre invalide (min 5 caractères)' });
    }

    if (!contenu || contenu.length < 10) {
      return res.status(400).json({ error: 'Contenu invalide (min 10 caractères)' });
    }

    if (!user_id) {
      return res.status(400).json({ error: 'user_id requis' });
    }

    const [result] = await pool.query(`
      INSERT INTO posts (titre, contenu, publie, user_id)
      VALUES (?, ?, ?, ?)
    `, [titre, contenu, publie || false, user_id]);

    res.status(201).json({
      id: result.insertId,
      titre,
      contenu,
      user_id,
      publie: publie || false
    });

  } catch (err) {
    next(err);
  }
}

// 🔹 DELETE /posts/:id
async function remove(req, res, next) {
  try {
    // vérifier s'il y a des commentaires
    const [rows] = await pool.query(
      `SELECT COUNT(*) AS count FROM comments WHERE post_id = ?`,
      [req.params.id]
    );

    if (rows[0].count > 0) {
      return res.status(409).json({
        erreur: 'Impossible de supprimer un post avec des commentaires'
      });
    }

    await pool.query(`DELETE FROM posts WHERE id = ?`, [req.params.id]);

    res.sendStatus(204);

  } catch (err) {
    next(err);
  }
}

// 🔹 GET /users/:id/posts
async function getPostsByUser(req, res, next) {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM posts
      WHERE user_id = ?
      ORDER BY created_at DESC
    `, [req.params.id]);

    res.json(rows);

  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  getPostsByUser
};