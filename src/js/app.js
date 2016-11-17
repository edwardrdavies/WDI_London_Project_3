angular
  .module('twitterForLondon', ['ngResource', 'ui.router', 'satellizer', 'ngSanitize'])
  .config(Router)
  .config(Auth);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
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

  $urlRouterProvider.otherwise('/');
}

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/register';

  $authProvider.tokenPrefix = '';

}
