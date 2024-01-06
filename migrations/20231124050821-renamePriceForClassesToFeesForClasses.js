'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'priceForClasses', 'feesForClasses');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'feesForClasses', 'priceForClasses');
  }
};