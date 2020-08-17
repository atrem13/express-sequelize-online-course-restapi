module.exports = (app, express) => {
  let router = express.Router();
  const upload = require('../middleware/upload');
  const controller = require('../controller/news.controller');
  
  router.get('/', controller.getAll);
  router.post('/', upload.single('file'), controller.save);
  router.get('/get/:news_id', controller.get);
  router.put('/update/:news_id', upload.single('file'), controller.update);
  router.delete('/delete/:news_id', controller.delete);

  app.use('/api/news/', router);
}