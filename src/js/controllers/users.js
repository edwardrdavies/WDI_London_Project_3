angular
  .module('twitterForLondon')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersEditController', UsersEditController)
  .controller('UsersShowController', UsersShowController)
  .controller('UserLinesController', UserLinesController);

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

UsersEditController.$inject = ['User', '$state', '$auth'];
function UsersEditController(User, $state, $auth) {
  const usersEdit = this;

  usersEdit.user = User.get({ id: $auth.getPayload()._id });

  function update() {
    usersEdit.user.$update(() => {
      $state.go('linesIndex', $state.params);
    });
  }

  usersEdit.update = update;

  function logout() {
    localStorage.removeItem('token');
    $state.go('login');
  }
  usersEdit.logout = logout;

}

UserLinesController.$inject = ['User', '$state', 'TFL', '$scope', '$auth'];
function UserLinesController(User, $state, TFL, $scope, $auth) {
  const userLines = this;
  userLines.all = [];

  userLines.user = User.get({ id: $auth.getPayload()._id });
  userLines.isFav = isFav;
  userLines.toggle = toggle;


  function isFav(line) {
    return userLines.user.lineFavs.includes(line.tflId);
  }

  function toggle(line) {
    if(isFav(line)) {
      const idx = userLines.user.lineFavs.findIndex((tflId) => {
        tflId === line.tflId;
      });
      userLines.user.lineFavs.splice(idx, 1);
    } else {
      userLines.user.lineFavs.push(line.tflId);
    }
  }

  function update() {
    userLines.user.$update(() => {
      $state.go('linesIndex', $state.params);
    });
  }

  userLines.update = update;

  TFL.getStatuses()
    .then((lines) => {
      userLines.all = lines;
    });
}
