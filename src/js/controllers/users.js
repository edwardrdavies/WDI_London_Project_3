angular
  .module('twitterForLondon')
  .controller('UsersIndexController', UsersIndexController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User){
  const usersIndex = this;

  usersIndex.all = User.query();
}
