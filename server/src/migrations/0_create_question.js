
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        // allowNull: false,
        type: Sequelize.TEXT
      },
      answer: {
        // allowNull: false,
        type: Sequelize.TEXT
      },
      img: {
        // allowNull: false,
        type: Sequelize.STRING
      }
    });

    const dataInit = require('../../data/initQuestion.json');
    // await queryInterface.sequelize.query('ALTER TABLE Questions AUTO_INCREMENT = 100000');

    // Insert initial data into the Products table
    await queryInterface.bulkInsert('questions', dataInit, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questions');
  }
};
