'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serverId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      command: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.addIndex('Permissions', {
      unique: true,
      fields: ['serverId', 'command']
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Permissions');
  }
};