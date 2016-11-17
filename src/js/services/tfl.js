angular
  .module('twitterForLondon')
  .service('TFL', TFL);

TFL.$inject = ['$http'];
function TFL($http) {
  function getStatuses() {
    return $http
      .get('/status')
      .then((res) => {
        return res.data;
      });
  }

  this.getStatuses = getStatuses;
}
