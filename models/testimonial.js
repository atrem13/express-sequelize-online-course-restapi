'use strict';
module.exports = (sequelize, DataTypes) => {
  const testimonial = sequelize.define('testimonial', {
    member_id: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {
    tableName: 'testimonials'
  });
  testimonial.associate = function(models) {
    // associations can be defined here
    testimonial.belongsTo(models.member, {
      foreignKey: 'member_id',
      as: 'member'
    });
  };
  return testimonial;
};