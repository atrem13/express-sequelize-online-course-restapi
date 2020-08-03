'use strict';
module.exports = (sequelize, DataTypes) => {
  const uploadImage = sequelize.define('uploadImage', {
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    data: DataTypes.BLOB
  }, {
    tableName: 'uploadImages'
  });
  uploadImage.associate = function(models) {
    // associations can be defined here
  };
  return uploadImage;
};