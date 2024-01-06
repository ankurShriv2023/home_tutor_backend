const { DataTypes, fn } = require('sequelize');
const sequelize = require('../db/sequelizeDB');

const SuperAdmin = sequelize.define('SuperAdmin', {
  adminName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminUserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminPhone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin',
  },
  adminCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminState: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminCountry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adminPostalCode: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  adminImage: {
    type: DataTypes.JSON,
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

module.exports = SuperAdmin;