'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      }
    });

    const roles = [
      { id: 1, value: 'admin' },
      { id: 2, value: 'user' },
    ];
    await queryInterface.bulkInsert('roles', roles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('roles', 'fk_role_user');
    await queryInterface.dropTable('roles');
  }
};
