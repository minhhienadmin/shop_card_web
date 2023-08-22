'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      
      User.belongsTo(models.Role, { foreignKey: 'roleId' , as: 'role'});
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comment' });
      User.hasMany(models.Order, { foreignKey: 'userId', as: 'order' });
      User.belongsTo(models.Membership, { foreignKey: 'memberId', as: 'membership' });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      avt: DataTypes.STRING,
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING(12),
      coins: DataTypes.STRING,
      status: DataTypes.STRING,
      birth: DataTypes.DATEONLY,
      roleId: {
        allowNull: false,
        defaultValue: 2,
        type: DataTypes.INTEGER.UNSIGNED
      },
      memberId: {
        allowNull: false,
        defaultValue: 4,
        type: DataTypes.INTEGER.UNSIGNED 
      },

    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users', // Add this line to match the table name
    }
  );
  return User;
};
