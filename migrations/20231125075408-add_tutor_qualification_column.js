'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'tutorQualification', {
      type: Sequelize.TEXT,
      get() {
        const stringValue = this.getDataValue('tutorQualification');
        return stringValue ? JSON.parse(stringValue) : null;
      },
      set(value) {
        const arrayValue = value ? JSON.stringify(value) : '';
        this.setDataValue('tutorQualification', arrayValue);
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'tutorQualification');
  },
};