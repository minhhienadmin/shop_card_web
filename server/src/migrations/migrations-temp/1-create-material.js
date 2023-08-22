'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Materials', {
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
      { id: 1, name: 'Giấy' },
      { id: 2, name: 'Nhựa' },
      { id: 3, name: 'Gỗ' },
      { id: 4, name: 'Giấy cứng' },
    ];
    await queryInterface.bulkInsert('Materials', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Materials', 'fk_material_product');
    await queryInterface.dropTable('Materials');
  }
};
