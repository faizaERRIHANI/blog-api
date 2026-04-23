const express = require('express');
require('dotenv').config();

// 🔥 Sequelize connexion
const sequelize = require('./config/sequelize');

// 🔥 charger modèles + associations
require('./models');

const app = express();

app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('API OK');
});

// routes
app.use('/posts', require('./routes/posts'));
app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));

const PORT = process.env.PORT || 3000;

// 🔥 sync DB + start serveur
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ DB synchronisée');

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur DB:', err);
  });