# 🚀 Blog API + E-commerce API (Node.js / Express / Sequelize)

## 📌 Description

Cette application est une API REST complète développée avec **Node.js**, **Express** et **Sequelize ORM**, connectée à une base de données **MySQL**.

Elle combine deux modules :

* 📝 Blog API (posts, commentaires, utilisateurs)
* 🛒 E-commerce API (produits, catégories, commandes)

---

## ⚙️ Technologies utilisées

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* dotenv
* express-validator

---

## 📦 Fonctionnalités

### 📝 Blog

* CRUD Posts
* Récupération des posts publiés avec auteur
* Détail d’un post avec commentaires
* Relations Sequelize (User ↔ Post ↔ Comment)

---

### 🛒 E-commerce

* CRUD Produits
* Gestion des catégories
* Filtres produits (prix, catégorie, pagination)
* Création de commandes avec :

  * calcul automatique du total
  * gestion du stock
  * transactions sécurisées

---

## 🔗 Endpoints principaux

### 📂 Products

* GET /products
* GET /products/:id
* POST /products
* PUT /products/:id
* DELETE /products/:id

---

### 📂 Categories

* GET /categories
* POST /categories

---

### 📂 Orders

* GET /orders
* GET /orders/:id
* POST /orders

---

## 🧪 Exemple de requête

### ➤ Créer une commande

```json
{
  "userId": 1,
  "items": [
    { "productId": 1, "quantite": 1 }
  ]
}
```

---

## ⚙️ Installation

```bash
git clone https://github.com/faizaERRIHANI/blog-api.git
cd blog-api
npm install
```

---

## 🔐 Configuration (.env)

Créer un fichier `.env` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blog_api
DB_PORT=3307
PORT=3000
```

---

## ▶️ Lancer le serveur

```bash
node index.js
```

---

## 📊 Structure du projet

```
blog-api/
│
├── config/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── .env
├── index.js
└── package.json
```

---

## ✅ Fonctionnalités techniques

* Sequelize associations (hasMany / belongsTo)
* Transactions (orders)
* Validation (express-validator)
* Gestion des erreurs centralisée
* Architecture MVC

---

## 👨‍💻 Auteur

**Faiza Errihani**

---

