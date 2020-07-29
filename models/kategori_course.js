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
  };
  return kategori_course;
};