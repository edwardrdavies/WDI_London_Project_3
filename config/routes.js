const router = require('express').Router();
const authController = require('../controllers/auth');
const twitterController = require('../controllers/twitterController');
const tflController = require('../controllers/tfl');
const oauthController = require('../controllers/oauth');
const secureRoute = require('../lib/secureRoute');
const usersController = require('../controllers/users');
const messagesController = require('../controllers/messages');


router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/confirm/:confirmationCode', authController.confirm)
  .post('/auth/facebook', oauthController.facebook)
  .post('/auth/twitter', oauthController.twitter)
  .post('/auth/instagram', oauthController.instagram)
  .post('/auth/github', oauthController.github)
  .get('/status', secureRoute, tflController.status);

  //TWITTER ROUTES
router.route('/tweets')
  .get(twitterController.index);

//userRoutes
router.route('/users')
  .get(secureRoute, usersController.index);
router.route('/users/:id')
  .get(secureRoute, usersController.show)
  .put(secureRoute, usersController.update);

router.route('/messages')
  .get(messagesController.index)
  .post(messagesController.create);

module.exports = router;
