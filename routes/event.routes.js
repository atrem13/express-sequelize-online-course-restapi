module.exports = (app, express) => {
    const router = express.Router();
    const controller = require('../controller/event.controller');

    router.get('/', controller.getAll);
    router.post('/', controller.save);
    router.get('/get/:event_id', controller.get);
    router.put('/update/:event_id', controller.update);
    router.delete('/delete/:event_id', controller.delete);

    app.use('/api/event/', router);
}