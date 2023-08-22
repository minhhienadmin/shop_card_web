'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      // define association here
      Size.hasMany(models.Product, { foreignKey: 'sizeId', as: 'size'});
    }
  }
  Size.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Size',
  });
  return Size;
};
