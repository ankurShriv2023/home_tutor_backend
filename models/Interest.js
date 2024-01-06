const { DataTypes, fn } = require('sequelize');
const sequelize = require('../db/sequelizeDB');
const Student = require('./Student');
const User = require('./User');

const Interest = sequelize.define('Interest', {
  tutorId: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  studentId: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  isApproved: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
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

module.exports = Interest;