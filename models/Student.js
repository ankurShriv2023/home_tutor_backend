const { DataTypes, fn } = require('sequelize');
const sequelize = require('../db/sequelizeDB');
const Claas = require('./Claas');

const Student = sequelize.define('Student', {
    studentName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studentGender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studentPhone: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    studentCity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    student_class: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fatherName: {
        type: DataTypes.STRING,
    },
    motherName: {
        type: DataTypes.STRING,
    },
    studentEmail: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    studentImage: {
        type: DataTypes.JSON,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'student',
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

module.exports = Student;