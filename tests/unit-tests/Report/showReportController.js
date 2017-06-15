angular.module('showReportModule', [])

.controller('showReportController', function($http, $scope, $ionicPopup, $state) {
   

   $scope.showReport = function(){
       mostrarReportes($http, $scope, $ionicPopup, $state);
   }
        
    function mostrarReportes($http, $scope, $ionicPopup, $state) {
    
        // Trae la información de los reportes(Adopción y maltrato) con la direccion
        var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';
    
        $http.post(link, {
            method: 'getID',
            id: $scope.ID
        }).then(function successCallback(response) {
            $scope.successCallback = true;
            $scope.arrayCasos = response.data;
            
            console.log(response.data);
           

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
         
    } 
});





