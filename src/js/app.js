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
  })
  .state('messagesNew', {
    url: '/messages/:tflId/new',
    templateUrl: '/templates/messagesNew.html',
    controller: 'MessagesNewController as message'
  })
  .state('messagesIndex', {
    url: '/messages/:tflId',
    templateUrl: '/templates/messagesIndex.html',
    controller: 'MessagesIndexController as messagesIndex'
  });

  function isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  if (isLoggedIn()) {
    console.log('I am logged in');
    $urlRouterProvider.otherwise('/lines');
  } else {
    console.log('I am not logged in');
    $urlRouterProvider.otherwise('/login');
  }
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

  $authProvider.github({
    clientId: '1ce21c481fa0a5dc7af0'
  });

}
