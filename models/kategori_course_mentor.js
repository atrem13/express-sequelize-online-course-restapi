'use strict';
module.exports = (sequelize, DataTypes) => {
  const kategori_course_mentor = sequelize.define('kategori_course_mentor', {
    kategori_course_id: DataTypes.INTEGER,
    mentor_id: DataTypes.INTEGER
  }, {
    tableName:'kategori_course_mentors'
  });
  kategori_course_mentor.associate = function(models) {
    // associations can be defined here
  };
  return kategori_course_mentor;
};