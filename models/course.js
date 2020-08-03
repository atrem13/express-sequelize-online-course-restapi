'use strict';
module.exports = (sequelize, DataTypes) => {
  const course = sequelize.define('course', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    kategori_course_id: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    total_member: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    tableName: 'courses'
  });
  course.associate = function(models) {
    // associations can be defined here
    course.belongsTo(models.kategori_course, {
      foreignKey: 'kategori_course_id',
      as: 'KategoriCourse',
      onDelete: 'set null',
      hooks: true
    });
  };
  return course;
};