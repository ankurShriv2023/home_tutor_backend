const { DataTypes, fn } = require('sequelize');
const sequelize = require('../db/sequelizeDB');
const Subject = require('./Subject');
const Course = require('./Course');
const Claas = require('./Claas');
const Qualification = require('./Qualification');

const User = sequelize.define('User', {
  tutorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tutorEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tutorPhone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  tutorCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tutorYearOfExperience: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin',
  },
  tutorClass: {
    type: DataTypes.TEXT,
    get() {
      const stringValue = this.getDataValue('tutorClass');
      return stringValue ? JSON.parse(stringValue) : null;
    },
    set(value) {
      const arrayValue = value ? JSON.stringify(value) : '';
      this.setDataValue('tutorClass', arrayValue);
    },
  },
  tutorSubject: {
    type: DataTypes.TEXT,
    get() {
      const stringValue = this.getDataValue('tutorSubject');
      return stringValue ? JSON.parse(stringValue) : null;
    },
    set(value) {
      const arrayValue = value ? JSON.stringify(value) : '';
      this.setDataValue('tutorSubject', arrayValue);
    },
  },
  tutorQualification: {
    type: DataTypes.TEXT,
    get() {
      const stringValue = this.getDataValue('tutorQualification');
      return stringValue ? JSON.parse(stringValue) : null;
    },
    set(value) {
      const arrayValue = value ? JSON.stringify(value) : '';
      this.setDataValue('tutorQualification', arrayValue);
    },
  },
  classSchedule: {
    type: DataTypes.TEXT,
    get() {
      const stringValue = this.getDataValue('classSchedule');
      return stringValue ? JSON.parse(stringValue) : null;
    },
    set(value) {
      const arrayValue = value ? JSON.stringify(value) : '';
      this.setDataValue('classSchedule', arrayValue);
    },
  },
  courses: {
    type: DataTypes.TEXT,
    get() {
      const stringValue = this.getDataValue('courses');
      return stringValue ? JSON.parse(stringValue) : null;
    },
    set(value) {
      const arrayValue = value ? JSON.stringify(value) : '';
      this.setDataValue('courses', arrayValue);
    },
  },
  feesForClasses: {
    type: DataTypes.TEXT,
    get() {
      const stringValue = this.getDataValue('feesForClasses');
      return stringValue ? JSON.parse(stringValue) : null;
    },
    set(value) {
      const arrayValue = value ? JSON.stringify(value) : '';
      this.setDataValue('feesForClasses', arrayValue);
    },
  },
  profileDescription: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.JSON,
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

Claas.hasMany(User, { foreignKey: 'tutorClass', as: 'users' });
User.belongsTo(Claas, { foreignKey: 'tutorClass', as: 'claas' });
Subject.hasMany(User, { foreignKey: 'tutorSubject', as: 'users' });
User.belongsTo(Subject, { foreignKey: 'tutorSubject', as: 'subject' });
Qualification.hasMany(User, { foreignKey: 'tutorQualification', as: 'users' });
User.belongsTo(Qualification, { foreignKey: 'tutorQualification', as: 'qualification' });
Course.hasMany(User, { foreignKey: 'courses', as: 'users' });
User.belongsTo(Course, { foreignKey: 'courses', as: 'course' });

module.exports = User;