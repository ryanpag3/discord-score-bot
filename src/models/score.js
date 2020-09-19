'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Score.init({
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
      type: Sequelize.ENUM(`SERVER`, `CHANNEL`)
    },
    name: {
      type: Sequelize.STRING(32)
    },
    value: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
    modelName: 'Score',
  });
  return Score;
};