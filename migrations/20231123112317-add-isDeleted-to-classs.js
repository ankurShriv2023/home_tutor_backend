'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Classs', 'isDeleted', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Classs', 'isDeleted');
  },
};