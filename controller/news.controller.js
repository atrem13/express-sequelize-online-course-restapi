const {news, Sequelize} = require('../models/index');
const {rs, re} = require('./function/rr_function');

let self = {};

self.save = (req, res) => {
  news.create(req.body).then((data) => {
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
  news.findAll({}).then((data) => {
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
  news.findOne(
    {
      where:{
        id: req.params.news_id
      }
    }
  ).then((data) => {
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
  news.update(req.body, {
    where:{
      id: req.params.news_id
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
  news.destroy({
    where:{
      id: req.params.news_id
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