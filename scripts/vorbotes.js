'use strict';

/**
 * @ngdoc overview
 * @name vorboteApp
 * @description
 * # vorboteApp
 *
 * Main module of the application.
 */
angular
  .module('vorboteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'auth0', 
    'angular-storage', 
    'angular-jwt'
  ])
  .config(function (authProvider) {
  authProvider.init({
    domain: 'alphio.auth0.com',
    clientID: '0xln7bEEKpXFwI43IZ8u6qQEjLX5U3aV'
  });
})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
})
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
});
 



(function(){

'use strict';

/**
 * @ngdoc function
 * @name vorboteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vorboteApp
 */
angular.module('vorboteApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
  })();

(function(){
'use strict';

/**
 * @ngdoc function
 * @name vorboteApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vorboteApp
 */
angular.module('vorboteApp')
  .controller('dashboardController', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
  })();
(function(){
'use strict';

/**
 * @ngdoc function
 * @name vorboteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vorboteApp
 */
angular.module('vorboteApp')
  .controller('HomeController', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
  

}]);
})();
(function(){
'use strict';

/**
 * @ngdoc function
 * @name vorboteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vorboteApp
 */
angular.module('vorboteApp')
  .controller('MainCtrl', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
  
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function () {
      // Error callback
    });
  }
  
    $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
  }

}]);
})();
(function(){
'use strict';

/**
 * @ngdoc function
 * @name vorboteApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vorboteApp
 */
angular.module('vorboteApp')
  .controller('userController', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
  
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/dashboard');
      $scope.isLoggedIn = true;
    }, function () {
      // Error callback
    });
  }
  
    $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $scope.isLoggedIn = false;
  }
  
  $scope.isLoggedIn = true;
  
  $scope.auth = auth;
  
  

}]);
})();