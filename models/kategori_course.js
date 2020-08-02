'use strict';
module.exports = (sequelize, DataTypes) => {
  const kategori_course = sequelize.define('kategori_course', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    icon: DataTypes.STRING
  }, {
    tableName: 'kategori_courses'
  });
  kategori_course.associate = function(models) {
    // associations can be defined here
    kategori_course.belongsToMany(models.mentor, {
      through: 'kategori_course_mentor',
      as: 'Mentors',
      foreignKey: 'kategori_course_id',
      otherKey: 'mentor_id',
      onDelete: 'cascade',
      hooks: true
    }); 
    kategori_course.belongsToMany(models.event, {
      through: 'kategori_course_event',
      as: 'Events',
      foreignKey: 'kategori_course_id',
      otherKey: 'event_id',
      onDelete: 'cascade',
      hooks: true
    });
  };
  return kategori_course;
};