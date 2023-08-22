'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../connection_database');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models){

    }
  }

  Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.TEXT,
        // allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        // allowNull: false,
      }
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'Question',
      tableName: 'questions',
    }
  );

  return Question;
}