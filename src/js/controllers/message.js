angular
  .module('twitterForLondon')
  .controller('MessagesNewController', MessagesNewController)
  .controller('MessagesIndexController', MessagesIndexController);

MessagesNewController.$inject = ['$http', 'Message', '$state'];

function MessagesNewController($http, Message, $state) {
  const messages = this;
  messages.all = [];
  messages.addMessage = addMessage;
  messages.newMessage = {};

  function addMessage() {
    messages.newMessage.tflId = $state.params.tflId;
    Message.save(messages.newMessage)
      .then((data) => {
        messages.all.push(data);
        messages.newMessage = {};
      });
  }

}

MessagesIndexController.$inject = ['Message', '$state'];
function MessagesIndexController(Message, $state){
  const messages = this;
  messages.all = [];

  messages.tflId = $state.params.tflId;

  function getMessages() {
    Message.query($state.params)
      .then((data) => {
        messages.all = data;
      });
  }

  getMessages();
}
