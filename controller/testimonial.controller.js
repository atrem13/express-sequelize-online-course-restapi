const {testimonial, Sequelize} = require('../models/index');
const {rs, re} = require('./function/rr_function');
const e = require('express');

let self = {};

self.save = (req, res) => {
    testimonial.create(req.body).then((data) => {
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
    testimonial.findAll({
        include:[
            'mMmber'
        ]
    }).then((data) => {
        if(data.length > 0){
            rs(res, data)
        }else{
            re(res, false, 404, 'database empty')
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.get = (req, res) => {
    testimonial.findOne({
        include:[
            'Member'
        ],
        where: {
            id: req.params.testimonial_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 404, 'testimonial doesnt exist');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.update = (req, res) => {
    testimonial.update(req.body, {
        where:{
            id: req.params.testimonial_id
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
    testimonial.destroy({
        where:{
            id: req.params.testimonial_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'delete fail');
        }
    }).catch((err) => {
        re(res, err);
    });
};

module.exports = self;