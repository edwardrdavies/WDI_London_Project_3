angular
  .module('twitterForLondon')
  .controller('LinesController', LinesController);

LinesController.$inject = ['$http'];
function LinesController($http) {

  function getTflStatus() {
    $http
      .get('/status')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTflStatus();
}
