'use strict';
const { Model } = require('sequelize');
const sequelize = require('../../connection_database');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      // define association here
    }
  }
  Contact.init(
    {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    theme: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    timestamps: false,
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
  });
  return Contact;
};
