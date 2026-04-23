const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'),
    defaultValue: 'PENDING'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = Order;