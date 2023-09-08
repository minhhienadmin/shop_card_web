
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pixels', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        // productId: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //         references: {
        //             model: 'products',
        //             key: 'id',
        //         },  
        // },
        // 

        firstName: {
            type: Sequelize.STRING,
            // allowNull: false,
        },

        lastName: {
            type: Sequelize.STRING,
            // allowNull: false,
        },

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pixels');
  }
};
