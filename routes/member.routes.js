module.exports = (app, express) => {
  const router = express.Router();
  const upload = require('../middleware/upload');
  const controller = require('../controller/member.controller');
  
  router.get('/', controller.getAll);
  router.post('/', upload.single('file'), controller.save);
  router.get('/get/:member_id', controller.get);
  router.put('/update/:member_id', upload.single('file'), controller.update);
  router.delete('/delete/:member_id', controller.delete);

  app.use('/api/member/', router);
};