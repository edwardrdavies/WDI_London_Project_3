const router = require('express').Router();
const authController = require('../controllers/auth');
const twitterController = require('../controllers/twitterController');
const tflController = require('../controllers/tfl');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .get('/status', tflController.status);

  //TWITTER ROUTES
router.route('/tweets')
  .get(twitterController.index);


module.exports = router;
