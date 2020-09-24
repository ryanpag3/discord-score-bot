'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Scoreboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serverId: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(255)
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('Scoreboards', {
      unique: true,
      fields: ['serverId', 'name',]
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Scoreboards');
  }
};