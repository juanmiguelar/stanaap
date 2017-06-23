angular.module('showReportModule', ['ngStorage'])

.controller('showReportController', function($http, $scope, $ionicPopup, $state,$localStorage) {
   
        console.log($localStorage.TIPO)
        // Trae la información de los reportes(Adopción y maltrato) con la direccion
        var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';
    
        $http.post(link, {
            method: 'getID',
            id: $localStorage.ID,
            tipo: $localStorage.TIPO
        }).then(function successCallback(response) {
            $scope.arrayCasos = response.data
            console.log(response.data);
          }, function errorCallback(response) {
            //En caso de que ocurra un error
          });
});





