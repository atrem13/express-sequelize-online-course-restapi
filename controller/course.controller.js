const {course, Sequelize} = require('../models/index');
const fs = require('fs');
const {rs, re} = require('./function/rr_function');
const {getDataImage, createAndUnlink, deleteDataImage} = require('./function/upload_image.function');

let self = {};

self.save = (req, res) => {
    if(req.file.filename){
        getDataImage(req, fs);
    }
    course.create(req.body).then((data) => {
        if(data){
            if(req.file.filename){
                createAndUnlink(req, fs, 'courses', data);
            }
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to create course');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.getAll = (req, res) => {
    course.findAll({
        include: [
            'KategoriCourse'
        ]
    }).then((data) => {
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
    course.findByPk(req.params.course_id, {
        include: [
            'KategoriCourse'
        ]
    }).then((data) => {
      if(data){
          rs(res, data);
      }else{
          re(res, false, 404, 'course_id doesnt exist');
      }  
    }).catch((err) => {
        re(res, err);
    });
;}

self.update = (req, res) => {
    var oldImg = '';
    course.findByPk(req.params.course_id,{}).then((oldData) => {
        oldImg = oldData.img;
    });
    if(req.file.filename){
        getDataImage(req, fs);
    }
    course.update(req.body, {
        where:{
            id: req.params.course_id
        }
    }).then((data) => {
        if(data){
            if(oldImg){
                deleteDataImage(fs, 'courses', oldImg);
            }
            createAndUnlink(req, fs, 'courses', data);
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to update course');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.delete = (req, res) => {
    var oldImg = '';
    course.findByPk(req.params.course_id,{}).then((oldData) => {
        oldImg = oldData.img;
    });
    course.destroy({
        where:{
            id: req.params.course
        }
    }).then((data) => {
        if(data){
            if(oldImg){
                deleteDataImage(fs, 'courses', oldImg);
            }
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to delete course');
        }
    }).catch((err) => {
        re(res, err);
    });
};

module.exports = self;