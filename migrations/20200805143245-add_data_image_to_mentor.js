'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('mentors', 'data_image', { type: Sequelize.BLOB('long') });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('mentors', 'data_image');
  }
};
