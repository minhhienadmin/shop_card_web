'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
      Product.belongsTo(models.Size, { foreignKey: 'sizeId', as: 'size' });
      Product.belongsTo(models.Effect, { foreignKey: 'effectId', as: 'effect' });
      Product.belongsTo(models.Material, { foreignKey: 'materialId', as: 'material' });
      Product.hasMany(models.Comment, { foreignKey: 'productId', as: 'comments'});
      Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'oderItems' });
    }
  }
  Product.init({
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING,
    banner: DataTypes.STRING,
    sizeId: {
      defaultValue:1,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    effectId: {
      allowNull: false,
      defaultValue:1,

      type: DataTypes.INTEGER
    },
    materialId: {
      allowNull: false,
      defaultValue:1,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};