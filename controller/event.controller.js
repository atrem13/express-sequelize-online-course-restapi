const {event, Seqeulize} = require('../models/index');
const {rs, re} = require('./function/rr_function');

let self = {};

self.save = (req, res) => {
    event.create(req.body).then((data) => {
        if(data){
            data.setKategoriCourses(req.body.kategori_courses).then((result) => {
                if(result){
                    rs(res, [data, result]);
                }else{
                    re(res, false, 400, 'fail to create kategori_course_event');
                }
            }).catch((err) => {
                re(res, err);
            });
        }else{
            re(res, false, 400, 'fail to create event');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.getAll = (req, res) => {
    event.findAll({
        include: [
            'KategoriCourses'
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
    event.findByPk({
        where:{
            id:req.params.event_id
        },
        include: [
            'KategoriCourses'
        ]
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 404, 'event id doesnt exist');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.update = (req, res) => {
    event.update(req.body, {
        where:{
            id: req.params.event_id
        }
    }).then((data) => {
        if(data){
            event.findByPk(req.params.event_id).then((updateData) => {
                updateData.setKategoriCourses(req.body.kategori_courses).then((result) => {
                    if(result){
                        rs(res, [updateData, result]);
                    }else{
                        re(res, false, 400, 'fail to update kategori_course_event');
                    }
                }).catch((err) => {
                    re(res, err);
                });
            });
        }else{
            re(res, false, 400, 'fail to update event');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.delete = (req, res) => {
    event.destroy({
        where:{
            id: req.params.event_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to delete event');
        }
    }).catch((err) => {
        re(res, err);
    });
};

module.exports = self;