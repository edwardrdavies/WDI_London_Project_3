const Twitter = require('twitter-node-client').Twitter;
const twitterText = require('twitter-text');

const twitter = new Twitter({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


function indexTweets (req, res) {
  const error = function (err) {
    console.log(err);
  };

  const success = function (data) {
    const tweets = JSON.parse(data);
    tweets.statuses.map((tweet) => {
      tweet.text = twitterText.autoLink(twitterText.htmlEscape(tweet.text));
      return tweet;
    });
    res.json(tweets);
  };
  twitter.getSearch({'q': 'district line' , 'count': 10}, error, success);
}

module.exports = {
  index: indexTweets
};
