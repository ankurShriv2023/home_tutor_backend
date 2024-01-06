'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Students', 'studentClass', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Students', 'studentClass', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};