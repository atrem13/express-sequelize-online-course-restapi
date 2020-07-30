const {kategori_course, Sequelize} = require('../models/index');
const {rs, re} = require('./function/rr_function');
const e = require('express');

let self = {};

self.save = (req, res) => {
    kategori_course.create(req.body).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'create fail');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.getAll = (req, res) => {
    kategori_course.findAll({}).then((data) => {
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
    kategori_course.findOne({
        where:{
            id: req.params.kategori_course_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 404, 'id kategori_course doesnt exist');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.update = (req, res) => {
    kategori_course.update(req.body, {
        where:{
            id:req.params.kategori_course_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'update fail');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.delete = (req, res) => {
    kategori_course.destroy({
        where:{
            id:req.params.kategori_course_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'delete fail');
        }
    }).catch((err) => {
        re(res. err);
    });
};

module.exports = self;