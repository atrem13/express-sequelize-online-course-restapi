'use strict';
module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define('news', {
    title: DataTypes.STRING,
    publish_date: DataTypes.DATE,
    desc: DataTypes.TEXT,
    img: DataTypes.STRING,
    data_image: DataTypes.BLOB
  }, {
    tableName: 'news'
  });
  news.associate = function(models) {
    // associations can be defined here
  };
  return news;
};