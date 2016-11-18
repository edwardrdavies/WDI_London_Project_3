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
    clientId: '799262881887961088-otHdpAYsUtsIQY1LaY96TY3jMywiFQI'
  });
  //
  // $authProvider.instagram({
  //   clientId: 'Instagram Client ID'
  // });

  //No additional setup required for Twitter
}
