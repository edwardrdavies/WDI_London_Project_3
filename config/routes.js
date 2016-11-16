const router = require('express').Router();
const authController = require('../controllers/auth');
const tflController = require('../controllers/tfl');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .get('/status', tflController.status);


module.exports = router;
