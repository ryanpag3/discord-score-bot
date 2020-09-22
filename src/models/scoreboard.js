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
            Scoreboard.belongsTo(models.User);
            models.User.hasMany(Scoreboard);

        }
    };
    Scoreboard.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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