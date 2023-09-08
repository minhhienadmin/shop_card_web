
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pictures', {
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
        title: {
            type: Sequelize.STRING,
            defaultValue: 0,
        },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pictures');
  }
};
