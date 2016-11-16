const router = require('express').Router();
const authController = require('../controllers/auth');
const twitterController = require('../controllers/twitterController');



router
  .post('/login', authController.login)
  .post('/register', authController.register);

  //TWITTER ROUTES
router.route('/tweets')
  .get(twitterController.index);

module.exports = router;
