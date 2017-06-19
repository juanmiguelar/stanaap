angular.module('logoutModule', ['ngStorage'])

.controller('logoutController', function($window,$ionicHistory, $ionicPopup, $state, $localStorage) {

   $state.go('app.login');
   $window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
});
