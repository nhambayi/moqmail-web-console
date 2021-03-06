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