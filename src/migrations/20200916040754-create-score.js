'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Scores', {
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
      channelId: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM(`SERVER`, `CHANNEL`, 'SCOREBOARD')
      },
      name: {
        type: Sequelize.STRING(32)
      },
      description: {
        type: Sequelize.STRING(155)
      },
      value: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    
    await queryInterface.addIndex('Scores', {
      unique: true,
      fields: ['serverId', 'channelId', 'name', 'type']
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Scores');
  }
};