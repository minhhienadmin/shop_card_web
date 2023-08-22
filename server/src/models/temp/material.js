'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    static associate(models) {
      // define association here
      Material.hasMany(models.Product, { foreignKey: 'materialId', as: 'product'});
    }
  }
  Material.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};
