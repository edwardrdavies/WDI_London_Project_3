angular
  .module('twitterForLondon')
  .service('TFL', TFL);

TFL.$inject = ['$http'];
function TFL($http) {
  function getStatuses(lines) {
    return $http
      .get('/status', { lines: lines })
      .then((res) => {
        return res.data;
      });
  }

  this.getStatuses = getStatuses;
}
