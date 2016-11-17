angular
  .module('twitterForLondon')
  .controller('LinesIndexController', LinesIndexController);

LinesIndexController.$inject = ['$http'];
function LinesIndexController($http) {
  const lines = this;
  lines.all = [];

  function getTflStatus() {
    $http
      .get('/status')
      .then((res) => {
        console.log(res);
        lines.all = res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTflStatus();
}
