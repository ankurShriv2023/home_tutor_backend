const { DataTypes, fn } = require('sequelize');
const sequelize = require('../db/sequelizeDB');

const Claas = sequelize.define('Claas', {
  className: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  isDeleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: fn('NOW'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: fn('NOW'),
  },
});

module.exports = Claas;