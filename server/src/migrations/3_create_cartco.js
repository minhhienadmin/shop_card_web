
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cartcos', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        cartId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'carts',
                key: 'id',
            },
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false,
                references: {
                    model: 'products',
                    key: 'id',
                },  
        },
        // 

        name: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        sides: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        price: {
            type: Sequelize.DECIMAL,
            // allowNull: false,
        },
        img_src: {
            type: Sequelize.STRING,
        },
        isDesigned: {
            type: Sequelize.STRING,
        },
        quantity: {
            type: Sequelize.INTEGER,
            // allowNull: false,
        },
        material: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        effect: {
            type: Sequelize.STRING,
            // allowNull: false,
        },
        size: {
            type: Sequelize.STRING,
            // allowNull: false,
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
    await queryInterface.dropTable('cartcos');
  }
};

