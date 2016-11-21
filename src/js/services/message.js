angular
  .module('twitterForLondon')
  .service('Message', Message);

Message.$inject = ['$http'];
function Message($http) {
  function save(message) {
    return $http.post('/messages', message)
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        console.log('Something went wrong with save in MessageService');
      });
  }

  function query(params) {
    return $http.get('/messages', { params })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        console.log('Something went wrong with query in MessageService');
      });
  }

  this.save = save;
  this.query = query;
}
