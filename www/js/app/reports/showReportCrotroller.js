angular.module('reportModule', ['ngStorage'])


.controller('reportController', function($http, $scope, $ionicPopup, $state, $localStorage) {
    ///SCOPES DE CASOS DE MALTRATO O ABANDONO
    mostrarReportes($http, $scope, $ionicPopup, $state);
    
});


function mostrarReportes($http, $scope, $ionicPopup, $state) {

    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';

    $http.post(link, {
        method: 'show'
    }).then(function(result) {

        $scope.response = result.data;
        console.log($scope.response);
    });
}
