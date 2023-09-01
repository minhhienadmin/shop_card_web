'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

let sequelize;
const customizeConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions:
    process.env.DB_SSL === 'true' ?
      {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      } : {}
  ,
  query: {
    "raw": true
  },
  timezone: "+07:00"
}

sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  customizeConfig);

const Cart = require('./Cart')(sequelize);
const CartCo=require('./CartCo')(sequelize);
const Comment = require('./Comment')(sequelize);
const Contact = require('./Contact')(sequelize);
const Order = require('./Order')(sequelize);
const OrderItem = require('./OrderItem')(sequelize);
const Prices = require('./Prices')(sequelize);
const Product = require('./Product')(sequelize);
const Question = require('./Question')(sequelize);
const Role = require('./Role')(sequelize);
const User = require('./User')(sequelize);


CartCo.belongsTo(Cart, { foreignKey: 'cartId'});
CartCo.belongsTo(Product, { foreignKey: 'productId' });
Cart.hasMany(CartCo, { foreignKey: 'cartId'});
Cart.belongsTo(User, { foreignKey: 'userId' });


const models={
  Cart,
  CartCo,
  Comment,
  Contact,
  Order,
  OrderItem,
  Prices,
  Product,
  Question,
  Role,
  User
}


module.exports = {sequelize,models};
