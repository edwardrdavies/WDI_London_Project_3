angular.module('twitterForLondon')
  .controller('RegisterController', RegisterController)
  .controller('LoginController', LoginController)
  .controller('ConfirmController', ConfirmationController);

RegisterController.$inject = ['$auth', '$state'];
function RegisterController($auth, $state) {
  const register = this;

  register.user = {};

  function submit() {
    $auth.signup(register.user)
      .then(() => {
        $state.go('login');
      });
  }

  register.submit = submit;
}

ConfirmationController.$inject = ['$http', '$state'];
function ConfirmationController($http, $state) {
  $http({
    method: 'POST',
    url: `/confirm/${$state.params.confirmationCode}`
  }).then(() => {
    $state.go('login');
  });
}

LoginController.$inject = ['$auth', '$state'];
function LoginController($auth, $state) {
  const login = this;

  login.credentials = {};

  function submit() {
    $auth.login(login.credentials)
    .then(() => {
      $state.go('linesIndex');
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
