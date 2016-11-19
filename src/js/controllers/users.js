angular
  .module('twitterForLondon')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersEditController', UsersIndexController)
  .controller('UsersShowController', UsersShowController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User){
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;

  usersShow.user = User.get($state.params);

  usersShow.isLoggedIn = $auth.isAuthenticated;

}

UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;


  usersEdit.user = User.get($state.params);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('linesIndex', $state.params);
    });
  }

  this.update = update;

}
