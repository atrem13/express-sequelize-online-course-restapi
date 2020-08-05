'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('news', 'data_image', { type: Sequelize.BLOB('long') });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('news', 'data_image');
  }
};
