angular
  .module('twitterForLondon')
  .service('TFL', TFL);

TFL.$inject = ['$http'];
function TFL($http) {
  function getStatuses(lines) {
    const params = {};
    if(lines && lines.length > 0) {
      params.lines = lines.join(',');
    }

    return $http
      .get('/status', { params })
      .then((res) => {
        return res.data;
      });
  }

  this.getStatuses = getStatuses;
}
