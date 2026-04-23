const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

//
// 🔹 BLOG (ancien TP)
//

// User ↔ Post
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Post ↔ Comment
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

// User ↔ Comment
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

//
// 🔥 E-COMMERCE (nouveau TP)
//

// Category ↔ Product
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Order ↔ OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Product ↔ OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  User,
  Post,
  Comment,
  Category,
  Product,
  Order,
  OrderItem
};