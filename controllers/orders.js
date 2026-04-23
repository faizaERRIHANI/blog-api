const { Order, OrderItem, Product, sequelize } = require('../models');

// 🔹 GET /orders
async function getAll(req, res, next) {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['nom', 'prix']
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json(orders);

  } catch (err) {
    next(err);
  }
}

// 🔹 GET /orders/:id
async function getById(req, res, next) {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['nom', 'prix']
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande introuvable' });
    }

    res.json(order);

  } catch (err) {
    next(err);
  }
}

// 🔹 POST /orders
async function create(req, res, next) {
  const t = await sequelize.transaction();

  try {
    const { userId, items } = req.body;

    // 🔴 validation
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ message: 'Données invalides' });
    }

    let total = 0;

    // 🔥 récupérer produits en une requête
    const productIds = items.map(i => i.productId);

    const products = await Product.findAll({
      where: { id: productIds },
      transaction: t
    });

    const productMap = {};
    products.forEach(p => {
      productMap[p.id] = p;
    });

    // 🔍 validation + calcul total
    for (const item of items) {
      const product = productMap[item.productId];

      if (!product) {
        await t.rollback();
        return res.status(404).json({
          message: `Produit ${item.productId} introuvable`
        });
      }

      if (product.stock < item.quantite) {
        await t.rollback();
        return res.status(400).json({
          message: `Stock insuffisant pour ${product.nom}`
        });
      }

      total += product.prix * item.quantite;
    }

    // 🧾 créer commande
    const order = await Order.create({
      userId,
      total
    }, { transaction: t });

    // 🧾 créer items + décrément stock
    for (const item of items) {
      const product = productMap[item.productId];

      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantite: item.quantite,
        prix: product.prix
      }, { transaction: t });

      product.stock -= item.quantite;
      await product.save({ transaction: t });
    }

    // ✅ commit
    await t.commit();

    res.status(201).json(order);

  } catch (err) {
    await t.rollback();
    next(err);
  }
}

module.exports = {
  getAll,
  getById,
  create
};