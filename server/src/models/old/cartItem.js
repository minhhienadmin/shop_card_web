'use strict';
const { Model, DataTypes } = require('sequelize');

  class CartItem extends Model {
    static associate(models){
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId'});
      CartItem.belongsTo(models.Product, { foreignKey: 'productId' });

    }
  }

  CartItem.init(
    {
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      // key
      cartId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Cart',
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
        type: DataTypes.STRING,
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

    },
    {
      timestamps: false,
      modelName: 'CartItem',
      tableName: 'cartitems',
    }
  );
module.exports= CartItem;