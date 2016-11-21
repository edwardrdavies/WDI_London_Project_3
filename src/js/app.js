angular
  .module('twitterForLondon', ['ngResource', 'ui.router', 'satellizer', 'ngSanitize'])
  .config(Router)
  .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider,   $urlRouterProvider) {
  $stateProvider
  .state('usersIndex', {
    url: '/users',
    templateUrl: '/templates/usersIndex.html',
    controller: 'UsersIndexController as user'
  })
  .state('linesIndex', {
    url: '/lines',
    templateUrl: '/templates/linesIndex.html',
    controller: 'LinesIndexController as linesIndex'
  })
  .state('linesFavIndex', {
    url: '/linesFav',
    templateUrl: '/templates/linesFavIndex.html',
    controller: 'LinesFavIndexController as linesFavIndex'
  })
  .state('linesShow', {
    url: '/lines/:tflId',
    templateUrl: '/templates/linesShow.html',
    controller: 'LinesShowController as linesShow'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html',
    controller: 'RegisterController as register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'LoginController as login'
  })
  .state('usersEdit', {
    url: '/user',
    templateUrl: '/templates/usersEdit.html',
    controller: 'UsersEditController as edit'
  })
  .state('userLines', {
    url: '/user/lines',
    templateUrl: '/templates/userLines.html',
    controller: 'UserLinesController as userLines'
  })
  .state('confirm', {
    url: '/confirm/:confirmationCode',
    templateUrl: '/templates/confirm.html',
    controller: 'ConfirmController as confirm'
  });

  $urlRouterProvider.otherwise('/lines');
}

Auth.$inject = ['$authProvider'];

function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';

  $authProvider.facebook({
    clientId: '360279380977935'
  });

  $authProvider.twitter({
    consumer_key: 'rG5fJ6jrp0NECDqpceKMo5UuZ'
  });
  //
  // $authProvider.instagram({
  //   clientId: 'Instagram Client ID'
  // });

}
