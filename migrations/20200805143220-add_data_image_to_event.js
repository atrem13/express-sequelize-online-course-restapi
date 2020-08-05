'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('events', 'data_image', { type: Sequelize.BLOB('long') });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('events', 'data_image');
  }
};
