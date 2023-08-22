'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'orderitems' });
    }
  }
  Order.init({
    orderId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    code: DataTypes.STRING,
    status: DataTypes.STRING,
    sizeId: {
      defaultValue:1,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    totalPrice: DataTypes.STRING,
    discount: DataTypes.STRING,
    note: DataTypes.STRING,
    payment: DataTypes.STRING,
    ship: DataTypes.STRING,
    
    nameGet: DataTypes.STRING,
    addressGet: DataTypes.STRING,
    phoneGet: DataTypes.STRING,
    code: DataTypes.STRING,
    orderDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
