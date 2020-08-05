const {mentor, Sequelize} = require('../models/index');
const fs = require('fs');
const {rs, re} = require('./function/rr_function');

let self = {};

self.save = (req, res) => {
    if(req.file.filename){
        req.body.data_image = fs.readFileSync(
            __basedir + '/resource/static/assets/tmp/' + req.file.filename
        );
        req.body.img = req.file.filename;
    }
    mentor.create(req.body).then((data) => {
        if(data){
            if(req.file.filename){
                fs.writeFileSync(
                    __basedir + '/resource/static/assets/mentors/' + req.file.filename, data.data_image
                );
                fs.unlinkSync(
                    __basedir + '/resource/static/assets/tmp/' + req.file.filename
                );
            }
            if(req.body.kategori_courses){
                data.setKategoriCourses(req.body.kategori_courses).then((result) => {
                    if(result){
                        rs(res, [data, result]);
                        // rs(res, req.body.customVar);
                    }else{
                        re(res, false, 400, 'fail to insert to kategori_course_mentor')
                    }
                }).catch((err) => {
                    re(res, err);
                });
            }else{
                    rs(res, data);
                    // rs(res, req.body.customVar);
            }
        }else{
            re(res, false, 400, 'fail to create mentor')
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
    if(req.file.filename){
        mentor.findByPk(req.params.mentor_id,{}).then((oldData) => {
            fs.unlinkSync(
                __basedir + '/resource/static/assets/mentors/' + oldData.img
            );
        });
        req.body.data_image = fs.readFileSync(
            __basedir + '/resource/static/assets/tmp/' + req.file.filename
        );
        req.body.img = req.file.filename;
    }
    mentor.update(req.body, {
        where:{
            id:req.params.mentor_id
        }
    }).then((data) => {
        if(data){
            mentor.findByPk(req.params.mentor_id, {}).then((updateData) => {
                if(req.file.filename){
                    fs.writeFileSync(
                        __basedir + '/resource/static/assets/mentors/' + req.file.filename, updateData.data_image
                    );
                    fs.unlinkSync(
                        __basedir + '/resource/static/assets/tmp/' + req.file.filename
                    );
                }
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
    let oldImg = '';
    mentor.findByPk(req.params.mentor_id,{}).then((oldData) => {
        oldImg = oldData.img;
        // fs.unlinkSync(
        //     __basedir + '/resource/static/assets/mentors/' + oldData.img
        // );
    });
    mentor.destroy({
        where:{
            id:req.params.mentor_id
        }
    }).then((data) => {
        if(data){
            fs.unlinkSync(
                __basedir + '/resource/static/assets/mentors/' + oldImg
            );
            rs(res, data);
        }else{
            re(res, false, 400, 'fail to delete mentor');
        }
    }).catch((err) => {
        re(res, err);
    });
};

module.exports = self;