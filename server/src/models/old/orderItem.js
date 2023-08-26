'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../connection_database');
const { associate } = require('./user');

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models){
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
      OrderItem.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }

  OrderItem.init(
    {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      // key
      orderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Order',
            key: 'id',
          },
        },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
        },  
      },
      // 

      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      sides: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.DECIMAL,
        // allowNull: false,
      },
      img_src: {
        type: DataTypes.STRING,
      },
      isDesigned: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      material: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      effect: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      sides: {
        type: DataTypes.STRING,
        // allowNull: false,
      },

    },
    {
      timestamps: false,
      sequelize,
      modelName: 'OrderItem',
      tableName: 'orderItems',
    }
  );

  return OrderItem;
}