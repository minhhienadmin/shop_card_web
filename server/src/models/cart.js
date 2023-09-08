'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Cart extends Model {
    static associate(models) {
      // define association here
      Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'cartItems'});
      Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
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
    tableName: 'carts'
  });
  return Cart;
};