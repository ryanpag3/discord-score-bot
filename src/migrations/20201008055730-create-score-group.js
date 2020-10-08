'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ScoreGroups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serverId: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM(`SERVER`, `CHANNEL`, 'SCOREBOARD', 'USER'),
        allowNull: false
      },
      scores: {
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
    await queryInterface.addIndex('ScoreGroups', {
      unique: true,
      fields: ['serverId', 'name', 'type']
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ScoreGroups');
  }
};