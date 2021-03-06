'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('kategori_course_mentors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kategori_course_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'kategori_courses',
            key: 'id',
          },
        onDelete: 'cascade'
      },
      mentor_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mentors',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('kategori_course_mentors');
  }
};