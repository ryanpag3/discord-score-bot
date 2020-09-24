'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Scoreboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // score 1-m
      Scoreboard.hasMany(models.Score);
      models.Score.belongsTo(Scoreboard);

      // user 1-1
      Scoreboard.belongsTo(models.User, { foreignKey: 'createdBy' });
      models.User.hasMany(Scoreboard, { foreignKey: 'createdBy' });

    }
  };
  Scoreboard.init({
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
  }, {
    sequelize,
    modelName: 'Scoreboard',
  });
  return Scoreboard;
};