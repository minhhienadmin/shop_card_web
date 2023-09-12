
'use strict';
const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
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
    tableName: 'roles'
  });
  return Role;
};
