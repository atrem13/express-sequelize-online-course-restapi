'use strict';
module.exports = (sequelize, DataTypes) => {
  const kategori_course_event = sequelize.define('kategori_course_event', {
    kategori_course_id: DataTypes.INTEGER,
    event_id: DataTypes.INTEGER
  }, {});
  kategori_course_event.associate = function(models) {
    // associations can be defined here
  };
  return kategori_course_event;
};