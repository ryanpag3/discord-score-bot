'use strict';

const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.changeColumn('Scores', 'type', {
    //   allowNull: false,
    //   type: Sequelize.ENUM(`SERVER`, `CHANNEL`, 'SCOREBOARD', 'USER')
    // })
    return await replaceEnum({
      queryInterface,
      tableName: 'Scores',
      columnName: 'type',
      newValues: [`SERVER`, `CHANNEL`, 'SCOREBOARD', 'USER'],
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.changeColumn('Scores', 'type', {
    //   allowNull: false,
    //   type: Sequelize.ENUM(`SERVER`, `CHANNEL`, 'SCOREBOARD')
    // });
    return await replaceEnum({
      queryInterface,
      tableName: 'Scores',
      columnName: 'type',
      newValues: [`SERVER`, `CHANNEL`, 'SCOREBOARD'],
    });
  }
};
