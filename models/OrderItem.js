const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prixUnitaire: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'order_items',
  timestamps: false
});

module.exports = OrderItem;