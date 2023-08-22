'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {
    static associate(models) {
      // define association here
      Membership.hasMany(models.User, { foreignKey: 'memberId', as: 'users'});
    }
  }
  Membership.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    discount: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
