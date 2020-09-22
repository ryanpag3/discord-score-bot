'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Scores',
      'ScoreboardId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Scoreboards',
          key: 'id'
        },
        upUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      `Scores`,
      'ScoreboardId'
    );
  }
};
