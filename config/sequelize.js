const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
  }
);

// test connexion
sequelize.authenticate()
  .then(() => console.log('✅ Sequelize connecté'))
  .catch(err => console.error('❌ Erreur Sequelize:', err));

module.exports = sequelize;