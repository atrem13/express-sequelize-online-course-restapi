module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controller/uploadimage.controller');
    const upload = require('../middleware/upload');

    router.post('/upload', upload.single('file'),controller.uploadFiles);

    app.use('/api/uploadimage/', router);
}