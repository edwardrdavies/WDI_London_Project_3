const request = require('request-promise');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/tokens').secret;
const qs = require('qs');
const uuid = require('uuid');
const oauthSignature = require('oauth-signature');

function facebook(req, res) {
  //REQUEST AN ACCESS TOKEN
  request.get({
    url: 'https://graph.facebook.com/v2.5/oauth/access_token',
    qs: {
      code: req.body.code,
      client_id: process.env.FACEBOOK_APP_ID,
      client_secret: process.env.FACEBOOK_APP_SECRET,
      redirect_uri: req.body.redirectUri
    },
    json: true
  }).then((accessToken) => {
    //request user's profile with accessToken
    return request.get({
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture',
      qs: accessToken,
      json: true
    });

  }).then((profile) => {
    //find or create a user
    User.findOne({ email: profile.email }, (err, user) => {
      if(err) return res.status(500).json({error: err });

      if(!user) {
        user = new User({
          facebookId: profile.id,
          profileImage: profile.picture.data.url,
          email: profile.email,
          username: `${profile.name} ${profile.id}`
        });
      } else {
        user.facebookId = profile.id;
        user.profileimage = profile.picture.data.url;
      }
      user.save((err, user) => {
        if(err) return res.status(400).json({ error: err });

        //geenrate JWT and send to the client
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '24h'});

        res.status(200).json({
          user,
          token
        });
      });

    });
  });

}

function twitter(req, res) {
  if (!req.body.oauth_token || !req.body.oauth_verifier) {
    console.log('step1', req.body);
    // step 1, we send our APIs credentials to twitter, to get a request token
    // twitter will then send a second request to this endpoint with a token and verifier
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        consumer_key: process.env.TWITTER_APP_KEY,
        consumer_secret: process.env.TWITTER_APP_SECRET,
        callback: req.body.redirectUri
      }
    })
    .then(function(body) {
      var oauthToken = qs.parse(body);
      return res.send(oauthToken);
    })
    .catch(function(err) {
      return res.status(500).json({ error: err });
    });
  } else {
    console.log('step2', req.body);
    // step 2, when the second arrives with the token and verifier
    // we can make a request for an access token
    request.post({
      url: 'https://api.twitter.com/oauth/access_token',
      form: {
        oauth_token: req.body.oauth_token,
        oauth_verifier: req.body.oauth_verifier
      }
    })
    .then(function(token) {
      token = qs.parse(token);

      const url = 'https://api.twitter.com/1.1/users/show.json';
      const method = 'GET';

      const params = {
        oauth_consumer_key: process.env.TWITTER_APP_KEY,
        oauth_nonce: uuid.v1(),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: (new Date()).getTime(),
        oauth_token: token.oauth_token,
        oauth_version: '1.0'
      };

      const signature = oauthSignature.generate(method, url, params, process.env.TWITTER_APP_KEY, token.oauth_token_secret);

      // step 3, we use the access token to get the user's profile data
      return request({
        method,
        url,
        qs: {
          screen_name: token.screen_name
        },
        oauth: {
          consumer_key: process.env.TWITTER_APP_KEY,
          consumer_secret: process.env.TWITTER_APP_SECRET,
          oauth_token: token.oauth_token,
          oauth_signature: signature
        },
        json: true
      });
    })
    .then(function(profile) {
      // step 4, we cannot get the user's email address from twitter, so we have to search for a user
      // by their twitter id

        //find or create a user
      User.findOne({ email: profile.email }, (err, user) => {
        if(err) return res.status(500).json({error: err });

        if(!user) {
          user = new User({
            twitterId: profile.id,
              //profileImage: profile.picture.data.url,
            email: profile.email,
            username: `${profile.name} ${profile.id}`
          });
        } else {
          user.twitterId = profile.id;
          console.log('getting twitter profile for twitter ', profile.id);

            //user.profileimage = profile.picture.data.url;
        }
        user.save((err, user) => {
          if(err) return res.status(400).json({ error: err });

            //geenrate JWT and send to the client
          console.log('about to get payload for twitter ');
          const payload = { _id: user._id, username: user.username };
          const token = jwt.sign(payload, secret, { expiresIn: '24h'});

          res.status(200).json({
            user,
            token
          });
        });
        console.log('profile for twitter ' , profile);
      // res.status(200).send();
      });
    });
  }
}

function instagram(req, res) {
  //REQUEST AN ACCESS TOKEN
  request.get({
    url: 'https://graph.facebook.com/v2.5/oauth/access_token',
    qs: {
      code: req.body.code,
      client_id: process.env.INSTAGRAM_APP_ID,
      client_secret: process.env.INSTAGRAM_APP_SECRET,
      redirect_uri: req.body.redirectUri
    },
    json: true
  }).then((accessToken) => {
    //request user's profile with accessToken
    return request.get({
      url: 'https://graph.facebook.com/v2.5/me?fields=id,name,email,picture',
      qs: accessToken,
      json: true
    });

  }).then((profile) => {
    //find or create a user
    User.findOne({ email: profile.email }, (err, user) => {
      if(err) return res.status(500).json({error: err });

      if(!user) {
        user = new User({
          facebookId: profile.id,
          profileImage: profile.picture.data.url,
          email: profile.email,
          username: `${profile.name} ${profile.id}`
        });
      } else {
        user.facebookId = profile.id;
        user.profileimage = profile.picture.data.url;
      }
      user.save((err, user) => {
        if(err) return res.status(400).json({ error: err });

        //geenrate JWT and send to the client
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, { expiresIn: '24h'});

        res.status(200).json({
          user,
          token
        });
      });

    });
  });

}


module.exports = {
  facebook,
  twitter,
  instagram
};
