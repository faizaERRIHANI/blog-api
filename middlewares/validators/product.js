const { body } = require('express-validator');

const validerProduct = [
  body('nom').notEmpty().withMessage('Nom requis'),
  body('prix').isFloat({ gt: 0 }).withMessage('Prix invalide'),
  body('stock').isInt({ min: 0 }).withMessage('Stock invalide'),
  body('categoryId').isInt({ min: 1 }).withMessage('Category invalide')
];

module.exports = { validerProduct };