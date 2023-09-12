'use strict';
const { Pool } = require('pg');
const { Model, DataTypes } = require('sequelize');
const SequelizePool = require('sequelize-pool');

module.exports = (pool) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
      User.hasMany(models.Order, { foreignKey: 'userId'});
      User.hasMany(models.Comment, { foreignKey: 'userId'});
      User.belongsTo(models.Role, { foreignKey: 'roleId'});
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birth: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        references: {
          model: 'Role',
          key: 'id',
        },
      }
    },
    {
      sequelize: pool,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};
