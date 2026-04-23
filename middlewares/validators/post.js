const { body } = require('express-validator');

const validerPost = [
  body('titre')
    .notEmpty().withMessage('Titre requis')
    .isLength({ min: 5 }).withMessage('Minimum 5 caractères'),

  body('contenu')
    .notEmpty().withMessage('Contenu requis')
    .isLength({ min: 10 }).withMessage('Minimum 10 caractères'),

  body('userId')
    .notEmpty().withMessage('userId requis')
    .isInt({ min: 1 }).withMessage('userId doit être un entier'),

  body('publie')
    .optional()
    .isBoolean().withMessage('publie doit être true ou false')
];

module.exports = { validerPost };