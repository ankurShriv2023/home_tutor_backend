'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Students', 'fatherName', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Students', 'motherName', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Students', 'studentEmail', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.changeColumn('Students', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Students', 'studentClass', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // This is the rollback logic if needed
    // Note: Be cautious while writing the rollback logic, and test thoroughly
    await queryInterface.changeColumn('Students', 'fatherName', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Students', 'motherName', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Students', 'studentEmail', {
      type: Sequelize.STRING,
      unique: false,
    });

    await queryInterface.changeColumn('Students', 'password', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('Students', 'studentClass', {
      type: Sequelize.INTEGER,
    });
  },
};