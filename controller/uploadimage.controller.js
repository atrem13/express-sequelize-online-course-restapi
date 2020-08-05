const fs = require('fs');
const {uploadImage, Sequelize} = require('../models/index');

let self = {};
self.uploadFiles = (req, res) => {
    uploadImage.create({
        type: req.file.mimetype,
        name: req.file.filename,
        data: fs.readFileSync(
            __basedir + '/resource/static/assets/tmp/' + req.file.filename
        )
    }).then((data) => {
        fs.writeFileSync(
            __basedir + '/resource/static/assets/uploads/' + req.file.filename, data.data
        );
        fs.unlinkSync(
            __basedir + '/resource/static/assets/tmp/' + req.file.filename
        );
        return res.send('file has been upload')
    }).catch((err) => {
        return res.send(err);
    })
};
self.deleteFiles = (req, res) => {
    uploadImage.destroy({
        where: {
            id: req.params.uploadImage_id
        }
    }).then((data) => {
        if(data){
            fs.unlinkSync(
                __basedir + '/resource/static/assets/uploads/' + req.params.image_name
            );
            return res.send('file has been delete')

        }else{
            return res.send('fail upload')
        }
    }).catch((err) => {
        return res.send(err)
    });
};

module.exports = self;
