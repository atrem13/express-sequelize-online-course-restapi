const multer = require('multer');

const imageFilter =  (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb('please upload image', false);
    }
};

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/resource/static/assets/tmp/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_idiotcoding_${file.originalname}`);
    },
});

let uploadFile = multer({storage: storage, fileFilter:imageFilter});

module.exports = uploadFile;