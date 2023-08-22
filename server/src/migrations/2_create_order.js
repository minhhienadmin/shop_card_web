'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderCode: {
        type: Sequelize.STRING,
        // allowNull: false,
      },  
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },

      nameReceive: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        // allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        // allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
