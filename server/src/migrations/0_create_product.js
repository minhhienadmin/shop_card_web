'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avt: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      name2: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      colorsys: {
        type: Sequelize.STRING
      },
      sides: {
        type: Sequelize.STRING
      },
      seen: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      pritech: {
        type: Sequelize.STRING
      },
      cut: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      effect: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    const initData = require('../../data/initProduct.json');
    await queryInterface.sequelize.query('ALTER SEQUENCE products_id_seq RESTART WITH 100000'); // Reset the sequence

    // Insert initial data into the Products table
    await queryInterface.bulkInsert('products', initData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
