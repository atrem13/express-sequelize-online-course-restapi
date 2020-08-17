module.exports = (app, express) => {
    const router = express.Router();
    const upload = require('../middleware/upload');
    const controller = require('../controller/course.controller');

    router.get('/', controller.getAll);
    router.post('/', upload.single('file'), controller.save);
    router.get('/get/:course_id', controller.get);
    router.put('/update/:course_id', upload.single('file'), controller.update);
    router.delete('/delete/:course_id', controller.delete);

    app.use('/api/course/', router);
}