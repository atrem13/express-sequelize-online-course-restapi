module.exports = (app, express) => {
    let router = express.Router();
    const controller = require('../controller/mentor.controller');
    
    router.get('/', controller.getAll);
    router.post('/', controller.save);
    router.get('/get/:mentor_id', controller.get);
    router.put('/update/:mentor_id', controller.update);
    router.delete('/delete/:mentor_id', controller.delete);
  
    app.use('/api/mentor/', router);
  }