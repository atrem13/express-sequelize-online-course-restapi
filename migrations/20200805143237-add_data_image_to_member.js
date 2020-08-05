'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('members', 'data_image', { type: Sequelize.BLOB('long') });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('members', 'data_image');
  }
};
