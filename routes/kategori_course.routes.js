module.exports = (app, express) => {
    const router = express.Router();
    const controller = require('../controller/kategori_course.controller');
    router.get('/', controller.getAll);
    router.post('/', controller.save);
    router.get('/get/:kategori_course_id', controller.get);
    router.put('/update/:kategori_course_id', controller.update);
    router.delete('/delete/:kategori_course_id', controller.delete);
    app.use('/api/kategori_course/', router);
}