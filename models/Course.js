const { DataTypes, fn } = require('sequelize');
const sequelize = require('../db/sequelizeDB');

const Course = sequelize.define('Course', {
    courseName: {
    type: DataTypes.STRING,
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

module.exports = Course;