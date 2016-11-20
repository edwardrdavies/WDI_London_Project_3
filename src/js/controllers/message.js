angular
  .module('twitterForLondon')
  .controller('MessagesController', MessagesController);

MessagesController.$inject = ['$http'];

function MessagesController($http) {
  const messages = this;
  messages.all = [];
  messages.addMessage = addMessage;
  messages.newMessage = {};

  function addMessage() {
    $http.post('/messages', messages.newMessage)
      .then((res) => {
        messages.all.push(res.data);
        messages.newMessage = {};

      })
        .catch(() =>{
          console.log('Something went wrong with addMessage in MessageController');
        });
  }
}
