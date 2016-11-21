const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/tokens').secret;
const mailer = require('../lib/mail');

function register(req, res){
  User.create(req.body, (err, user) => {

    mailer.sendMail(user, (err) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });

      const payload = { _id: user._id, username: user.username };
      const token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

      return res.status(200).json({
        message: `Welcome ${user.username}!`,
        user,
        token
      });
    });
  });
}

function confirm(req, res) {
  User.findOne({ confirmationCode: req.params.confirmationCode }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user) return res.status(401).json({ message: 'Unauthorised.' });

    user.locked = false;

    user.save((err) => {
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      res.status(204).send();
    });

  });
}

function login(req, res){
  User.findOne({ email: req.body.email, locked: false }, (err, user) => {
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    const payload = { _id: user._id, username: user.username };
    const token = jwt.sign(payload, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      message: 'Welcome back.',
      user,
      token
    });
  });
}

module.exports = {
  register,
  login,
  confirm
};
