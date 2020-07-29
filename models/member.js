'use strict';
module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define('member', {
    name: DataTypes.STRING,
    motto: DataTypes.STRING,
    genre: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {});
  member.associate = function(models) {
    // associations can be defined here
    member.hasMany(models.testimonial, {
      foreignKey: 'member_id',
      as: 'testimonials'
    });
  };
  return member;
};