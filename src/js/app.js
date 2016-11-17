angular
  .module('twitterForLondon', ['ngResource', 'ui.router', 'satellizer'])
    .config(Router)
    .config(Auth);


Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider,   $urlRouterProvider) {
  $stateProvider
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
  .state('linesIndex', {
    url: '/linesindex',
    templateUrl: '/templates/linesIndex.html',
    controller: 'LinesIndexController as linesIndex'
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
  //
  // $authProvider.github({
  //   clientId: '1ce21c481fa0a5dc7af0'
  // });
  //
  // $authProvider.instagram({
  //   clientId: 'Instagram Client ID'
  // });

  //No additional setup required for Twitter
}
