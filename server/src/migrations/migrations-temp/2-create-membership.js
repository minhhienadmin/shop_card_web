'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.FLOAT
      }
    });
    let data = [
      { id: 1, name: 'Kim cương', discount: '20%'},
      { id: 2, name: 'Vàng', discount: '14%' },
      { id: 3, name: 'Bạc' , discount: '7%'},
      { id: 4, name: 'Đồng' , discount: '0%'},
    ];
    await queryInterface.bulkInsert('Memberships', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Memberships');
  }
};
