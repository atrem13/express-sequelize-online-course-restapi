module.exports = (app, express) => {
  const router = express.Router();
  const controller = require('../controller/member.controller');
  
  router.get('/', controller.getAll);
  router.post('/', controller.save);
  router.get('/get/:member_id', controller.get);
  router.put('/update/:member_id', controller.update);
  router.delete('/delete/:member_id', controller.delete);

  app.use('/api/member/', router);
};