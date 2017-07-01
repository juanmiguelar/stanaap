angular.module('logoutModule', ['ngStorage'])

.controller('logoutController', function($scope,$window,$ionicHistory, $ionicPopup, $state, $localStorage) {

   
    $window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
    });
    $state.go('app.login');
});
