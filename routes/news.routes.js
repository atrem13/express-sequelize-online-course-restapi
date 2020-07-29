module.exports = (app, express) => {
  let router = express.Router();
  const controller = require('../controller/news.controller');
  
  router.get('/', controller.getAll);
  router.post('/', controller.save);
  router.get('/get/:news_id', controller.get);
  router.put('/update/:news_id', controller.update);
  router.delete('/delete/:news_id', controller.delete);

  app.use('/api/news/', router);
}