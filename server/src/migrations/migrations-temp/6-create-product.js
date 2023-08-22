'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      banner: {
        type: Sequelize.STRING
      },
      sizeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Sizes',
          key: 'id'
        }
      },
      effectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Types',
          key: 'id'
        }
      },
      materialId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Materials',
          key: 'id'
        }
      }
    });
    let data = [
      {
        productId: 1,
        status: "active",
        image: 'https://via.placeholder.com/400x400',
        sizeId: 1,
        typeId:2,
        materialId:3,
        love: "1.2k",
        name: "Card bo góc",
      }
    ];
    await queryInterface.bulkInsert('Types', data, {});
  },

  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
