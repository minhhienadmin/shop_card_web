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
        // allowNull: false,
        type: Sequelize.STRING
      },
      video: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      name2: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      color: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      colorsys: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      sides: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      seen: {
        // allowNull: false,
        type: Sequelize.INTEGER
      },
      price: {
        // allowNull: false,
        type: Sequelize.DECIMAL,
      },
      pritech: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      cut: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      time: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      material: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      effect: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      size: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      img: {
        // allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    const initData = require('../../../data/initProduct.json');
    await queryInterface.sequelize.query('ALTER TABLE Products AUTO_INCREMENT = 100000');

    // Insert initial data into the Products table
    await queryInterface.bulkInsert('products', initData, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
