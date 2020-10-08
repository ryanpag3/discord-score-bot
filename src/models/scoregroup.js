'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class ScoreGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ScoreGroup.init({
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
  }, {
    sequelize,
    modelName: 'ScoreGroup',
  });
  return ScoreGroup;
};