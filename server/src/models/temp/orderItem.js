'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'user' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  OrderItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: DataTypes.STRING,
    material: DataTypes.STRING,
    effect: DataTypes.STRING,
    size: DataTypes.STRING,
    
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productId: {
      defaultValue:1,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};
