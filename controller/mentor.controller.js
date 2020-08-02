const {mentor, Sequelize} = require('../models/index');
const {rs, re} = require('./function/rr_function');

let self = {};

self.save = (req, res) => {
    mentor.create(req.body).then((data) => {
        if(data){
            data.setKategoriCourses(req.body.kategori_courses).then((result) => {
                if(result){
                    rs(res, [data, result]);
                }else{
                    re(res, false, 400, 'fail to insert to kategori_course_mentor')
                }
            }).catch((err) => {
                re(res, err);
            });
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.getAll = (req, res) => {
    mentor.findAll({
        include:[
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
    mentor.findByPk(req.params.mentor_id, {
        include: [
            'KategoriCourses'
        ]
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 404, 'mentor id doenst exist');
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.update = (req, res) => {
    mentor.update(req.body, {
        where:{
            id:req.params.mentor_id
        }
    }).then((data) => {
        if(data){
            mentor.findByPk(req.params.mentor_id, {}).then((updateData) => {
                updateData.setKategoriCourses(req.body.kategori_courses).then((result) => {
                    if(result){
                        rs(res, [updateData, result]);
                    }else{
                        re(res, false, 400, 'fail to update kategori_course_mentor');
                    }
                }).catch((err) => {
                    re(res, err);;
                });
            });
        }
    }).catch((err) => {
        re(res, err);
    });
};

self.delete = (req, res) => {
    mentor.destroy({
        where:{
            id:req.params.mentor_id
        }
    }).then((data) => {
        if(data){
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to delete mentor');
        }
    }).catch((err) => {
        re(res, err);
    });
};

module.exports = self;