'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PriceList extends Model {
    static associate(models) {
      // define association here
      PriceList.belongsTo(models.Product, {foreignKey: 'productId'})
    }
  }
  PriceList.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    
    size: DataTypes.STRING,
    material: DataTypes.STRING,
    lim1: DataTypes.STRING,
    lim2: DataTypes.STRING,
    value: DataTypes.STRING,
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
        },  
      }
  }, {
    timestamps: false,
    sequelize,
    modelName: 'PriceList',
    tableName: 'pricelists',
  });
  return PriceList;
};
