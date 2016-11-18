const router = require('express').Router();
const authController = require('../controllers/auth');
const twitterController = require('../controllers/twitterController');
const tflController = require('../controllers/tfl');
const oauthController =
require('../controllers/oauth');
// const secureRoute = require('../lib/secureRoute');
const usersController = require('../controllers/users');
const linesController = require('../controllers/lines');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook)
  .post('/auth/twitter', oauthController.twitter)
  // .post('/auth/instagram', oauthController.instagram)
  .get('/status', tflController.status);

  //TWITTER ROUTES
router.route('/tweets')
  .get(twitterController.index);

//userRoutes
router.route('/users')
  .get(usersController.index);
router.route('/users/:id')
  .get(usersController.show)
  .put(usersController.update);

router.route('/lines')
  .get(linesController.index);
router.route('/lines/:id')
  .get(linesController.show)
  .put(linesController.update);


module.exports = router;
