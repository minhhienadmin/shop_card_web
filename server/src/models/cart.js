'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      Cart.hasMany(models.CartItem, { foreignKey: 'cartId'});
      Cart.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

Cart.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    // // key
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    // // 


    status: {
      type: DataTypes.STRING,
      // allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};