angular.module('twitterForLondon')
  .controller('TwitterController', TwitterController);


TwitterController.$inject = ['$http'];
function TwitterController($http) {
  const tweets = this;
  tweets.all = [];

  function getTweets() {
    $http.get('/tweets')
      .then((res, err) => {
        if(err) {
          console.log('Something went wrong, run away from ', err );
          return;
        }
        tweets.all = res.data.statuses;
        console.log(tweets.all);
      });
  }

  getTweets();
}
