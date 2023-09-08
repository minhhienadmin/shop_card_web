
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
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

        type: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        city: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        zip: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        state: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        line1: {
            type: Sequelize.STRING,
            defaultValue: 0,
        },
        line2: {
            type: Sequelize.STRING,
            defaultValue: 0,
        },
        
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('addresses');
  }
};
