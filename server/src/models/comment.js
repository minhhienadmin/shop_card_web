'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'userId'});
      Comment.belongsTo(models.Product, { foreignKey: 'productId'});
    }
  }
  Comment.init({
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    text: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  });
  return Comment;
};
