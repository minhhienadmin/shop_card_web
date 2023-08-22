'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Types', {
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
      { id: 1, name: 'Cơ bản - Không hiệu ứng' },
      { id: 2, name: 'In lấp lánh' },
      { id: 3, name: 'In bóng' },
      { id: 4, name: 'In mờ' },
    ];
    await queryInterface.bulkInsert('Types', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Types');
  }
};
