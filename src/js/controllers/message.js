angular
  .module('twitterForLondon')
  .controller('MessagesNewController', MessagesNewController)
  .controller('MessagesIndexController', MessagesIndexController);

MessagesNewController.$inject = ['$http'];

function MessagesNewController($http) {
  const messages = this;
  messages.all = [];
  messages.addMessage = addMessage;
  messages.newMessage = {};

  function addMessage() {
    $http.post('/messages', messages.newMessage)
      .then((res) => {
        messages.all.push(res.data);
        messages.newMessage = {};
        console.log(messages.newMessage);
        console.log(messages.all);
      })
        .catch(() =>{
          console.log('Something went wrong with addMessage in MessageController');
        });
  }
}

MessagesIndexController.$inject = ['Message'];

function MessagesIndexController(Message){
  const MessagesIndex = this;

  MessagesIndex.all = Message.query();
}
