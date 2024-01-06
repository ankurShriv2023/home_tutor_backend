'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'studentClass');

    await queryInterface.addColumn('Students', 'student_class', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'studentClass', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.removeColumn('Students', 'student_class');
  },
};