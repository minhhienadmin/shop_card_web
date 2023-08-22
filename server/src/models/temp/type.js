'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Effect extends Model {
    static associate(models) {
      // define association here
      Effect.hasMany(models.Product, { foreignKey: 'typeId', as: 'products' });
    }
  }
  Effect.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Effect',
  });
  return Effect;
};
