angular
  .module('twitterForLondon')
  .controller('LinesIndexController', LinesIndexController)
  .controller('LinesShowController', LinesShowController);


LinesIndexController.$inject = ['TFL'];
function LinesIndexController(TFL) {
  const linesIndex = this;
  linesIndex.all = [];

  TFL.getStatuses()
    .then((lines) => {
      linesIndex.all = lines;
    });
}

LinesShowController.$inject = ['TFL', '$http', '$state'];
function LinesShowController(TFL, $http, $state) {
  const linesShow = this;
  linesShow.tweets = [];

  TFL.getStatuses()
    .then((lines) => {
      linesShow.line = lines.filter((line) => {
        return line.tflId === $state.params.tflId;
      })[0];
    });

  function getTweets() {
    $http({
      method: 'GET',
      url: '/tweets',
      params: { q: $state.params.tflId }
    }).then((res, err) => {
      if(err) {
        console.log('Something went wrong, run away from ', err );
        return;
      }
      linesShow.tweets = res.data.statuses;
      console.log(linesShow.tweets);
    });
  }

  getTweets();
}
