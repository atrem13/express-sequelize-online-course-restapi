module.exports = (app, express) => {
  const router = express.Router();
  const controller = require('../controller/testimonial.controller');
  router.get('/', controller.getAll);
  router.post('/', controller.save);
  router.get('/get/:testimonial_id', controller.get);
  router.put('/update/:testimonial_id', controller.update);
  router.delete('/delete/:testimonial_id', controller.delete);

  app.use('/api/testimonial/', router);
};