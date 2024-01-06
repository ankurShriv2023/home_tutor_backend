'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tutorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tutorEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tutorPhone: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      tutorCity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tutorYearOfExperience: {
        type: Sequelize.INTEGER,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'admin',
      },
      tutorClass: {
        type: Sequelize.TEXT,
      },
      tutorSubject: {
        type: Sequelize.TEXT,
      },
      classSchedule: {
        type: Sequelize.TEXT,
      },
      courses: {
        type: Sequelize.STRING,
      },
      priceForClasses: {
        type: Sequelize.STRING,
      },
      profileDescription: {
        type: Sequelize.STRING,
      },
      profileImage: {
        type: Sequelize.JSON,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};