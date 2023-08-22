
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pricelists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      size: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      material: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      lim1: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      lim2: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      value: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },  
    },
    });

    // const dataInit = require('../../data/initContact.json');
    // // await queryInterface.sequelize.query('ALTER TABLE pricelists AUTO_INCREMENT = 100000');

    // // Insert initial data into the Products table
    // await queryInterface.bulkInsert('pricelists', dataInit, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pricelists');
  }
};
