'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../connection_database');
const { associate } = require('./user');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models){
      Product.hasMany(models.PriceList, {foreignKey: 'productId'});
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      avt: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      video: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      name2: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      colorsys: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      sides: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      seen: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.DECIMAL,
        // allowNull: false,
      },
      pritech: {
        type: DataTypes.STRING,
      },
      cut: {
        type: DataTypes.INTEGER,
      },
      time: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
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
      img: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'Product',
      tableName: 'products',
    }
  );

  return Product;
}