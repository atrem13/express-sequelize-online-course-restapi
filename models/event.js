'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
    img: DataTypes.STRING,
  }, {
    tableName: 'events'
  });
  event.associate = function(models) {
    // associations can be defined 
    event.belongsToMany(models.kategori_course, {
      through: 'kategori_course_event',
      as: 'KategoriCourses',
      foreignKey: 'event_id',
      otherKey: 'kategori_course_id',
      onDelete: 'cascade',
      hooks: true
    });
  };
  return event;
};