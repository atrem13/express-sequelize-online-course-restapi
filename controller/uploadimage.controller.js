const fs = require('fs');
const path = require('path');
const {uploadImage, Sequelize} = require('../models/index');

let self = {};
self.uploadFiles = (req, res) => {
    uploadImage.create({
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(
            __basedir + '/resource/static/assets/uploads/' + req.file.filename
        )
    }).then((data) => {
        fs.writeFileSync(
            __basedir + '/resource/static/assets/tmp/' + `${Date.now()}_idiotcoding_${file.originalname}`
        );
        return res.send('file has been upload')
    }).catch((err) => {
        return res.send(err);
    })
};

module.exports = self;
