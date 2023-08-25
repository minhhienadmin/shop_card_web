'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId'});
      Order.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
Order.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderCode: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    
    // key
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    // 
    
    nameReceive: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    

  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
  });
  return Order;
};