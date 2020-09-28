'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Keywords', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false
      },
      serverId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ScoreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Scores',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.addIndex('Keywords', {
      unique: true,
      fields: ['serverId', 'name', 'ScoreId',]
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Keywords');
  }
};