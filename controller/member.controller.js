const {member, Sequelize} = require('../models/index');
const fs = require('fs');
const {rs, re} = require('./function/rr_function');
const {getDataImage, createAndUnlink, updateAndUnlink, deleteDataImage} = require('./function/upload_image.function');

const self ={};

self.save = (req, res) => {
  if(req.file.filename){
    getDataImage(req, fs);
  }
  member.create(req.body).then((data) => {
    if(data){
      if(req.file.filename){
        createAndUnlink(req, fs, 'members', data);
      }
      rs(res, data);
    }else{
      re(res, false, 400, 'create fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.getAll = (req, res) => {
  member.findAll({}).then((data) => {
    if(data.length > 0){
      rs(res, data);
    }else{
      re(res, false, 404, 'database empty');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.get = (req, res) => {
  member.findOne({
    where:{
      id: req.params.member_id
    }
  }).then((data) => {
    if(data){
      rs(res, data);
    }else{
      re(res, false, 404, 'id doesnt exist');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.update = (req, res) => {
  var oldImg = '';
  member.findByPk(req.params.member_id,{}).then((oldData) => {
      oldImg = oldData.img;
  });
  if(req.file.filename){
    getDataImage(req, fs);
  }
  member.update(req.body, {
    where:{
      id: req.params.member_id
    }
  }).then((data) => {
    if(data){
      if(oldImg){
        deleteDataImage(fs, 'members', oldImg);
      }
      updateAndUnlink(req, fs, member, req.params.member_id, 'members');
      // member.findByPk(req.params.member_id, {}).then((updateData) => {
      //   createAndUnlink(req, fs, 'members', updateData);
      // });
      rs(res, data);
    }else{
      re(res, false, 400, 'update fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

self.delete = (req, res) => {
  var oldImg = '';
  member.findByPk(req.params.member_id,{}).then((oldData) => {
      oldImg = oldData.img;
  });
  member.destroy({
    where:{
      id:req.params.member_id
    }
  }).then((data) => {
    if(data){
      if(oldImg){
        deleteDataImage(fs, 'members', oldImg);
      }
      rs(res, data);
    }else{
      re(res, false, 400, 'delete fail');
    }
  }).catch((err) => {
    re(res, err);
  });
};

module.exports = self;