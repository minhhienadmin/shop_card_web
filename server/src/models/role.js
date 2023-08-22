'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.hasMany(models.User, { foreignKey: 'roleId'});
    }
  }
  Role.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    value: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
