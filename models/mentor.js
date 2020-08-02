'use strict';
module.exports = (sequelize, DataTypes) => {
  const mentor = sequelize.define('mentor', {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    img: DataTypes.STRING
  }, {
    tableName: 'mentors'
  });
  mentor.associate = function(models) {
    // associations can be defined here
    mentor.belongsToMany(models.kategori_course, {
      through: 'kategori_course_mentor',
      as: 'KategoriCourses',
      foreignKey: 'mentor_id',
      otherKey: 'kategori_course_id',
      onDelete: 'cascade',
      hooks: true
    });
  };
  return mentor;
};