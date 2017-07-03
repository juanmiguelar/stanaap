angular.module('logoutModule', ['ngStorage'])

.controller('logoutController', function($state,$scope,$window,$ionicHistory) {

    $window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
    });
    $state.go('app.home');
});
