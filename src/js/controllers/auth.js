angular.module('twitterForLondon')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
    .then(() => {
      $state.go('profileIndex');
    });
  }

  function authenticate (provider) {
    $auth.authenticate(provider)
      .then((res) => {
        console.log(res);
      });
  }

  login.submit = submit;
  login.authenticate = authenticate;
}
