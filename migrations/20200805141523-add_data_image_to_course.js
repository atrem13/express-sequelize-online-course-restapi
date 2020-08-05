'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('courses', 'data_image', { type: Sequelize.BLOB('long') });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('courses', 'data_image');
  }
};
