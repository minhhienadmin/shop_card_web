'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userId'
        }
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'productId'
        }
      },
      text: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('Comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_comment_user',
      references: {
        table: 'Users',
        field: 'userId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'fk_comment_product',
      references: {
        table: 'Products',
        field: 'productId'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Comments', 'fk_comment_user');
    await queryInterface.removeConstraint('Comments', 'fk_comment_product');
    await queryInterface.dropTable('Comments');
  }
};
