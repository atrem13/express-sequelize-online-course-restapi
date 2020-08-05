module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controller/uploadimage.controller');
    const upload = require('../middleware/upload');

    router.post('/upload', upload.single('file'), controller.uploadFiles);
    router.delete('/delete/:uploadImage_id/:image_name', controller.deleteFiles);

    app.use('/api/uploadimage/', router);
}