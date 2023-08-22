
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      link: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      theme: {
        // allowNull: false,
        type: Sequelize.STRING
      }
    });

    const dataInit = require('../../data/initContact.json');
    // await queryInterface.sequelize.query('ALTER TABLE Contacts AUTO_INCREMENT = 100000');

    // Insert initial data into the Products table
    await queryInterface.bulkInsert('contacts', dataInit, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  }
};
