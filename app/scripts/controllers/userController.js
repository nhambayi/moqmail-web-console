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
  .controller('userController', ['$scope', '$http', 'userProfileService', 'store', '$location',
function ($scope, $http, userProfileService, store, $location) {
  
  $scope.login = function () {
    userProfileService.login();
  }
  
    $scope.logout = function() {
    userProfileService.signOut();
    $scope.isLoggedIn = false;
  }
  
  $scope.isLoggedIn = userProfileService.isAuthenticated();
  $scope.profile = userProfileService.getProfile();
    

}]);
})();