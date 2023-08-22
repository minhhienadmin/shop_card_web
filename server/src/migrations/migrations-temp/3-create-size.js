'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sizes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      }
    });
    let data = [
      { id: 1, name: '3x4' },
      { id: 2, name: '2x3' },
      { id: 3, name: '4x6' },
      { id: 4, name: '9x16' },
    ];
    await queryInterface.bulkInsert('Sizes', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sizes');
  }
};
