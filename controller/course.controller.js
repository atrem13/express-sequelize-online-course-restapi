const {course, Sequelize} = require('../models/index');
const {rs, re} = require('./function/rr_function');

let self = {};

self.save = (req, res) => {
    course.create(req.body).then((data) => {
        if(data){
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
    course.update(req.body, {
        where:{
            id: req.params.course_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to update course');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.delete = (req, res) => {
    course.destroy({
        where:{
            id: req.params.course
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to delete course');
        }
    }).catch((err) => {
        re(res, err);
    });
};

module.exports = self;