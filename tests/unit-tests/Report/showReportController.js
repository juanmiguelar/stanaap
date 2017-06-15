angular.module('showReportModule', [])

.controller('showReportController', function($http, $scope) {
   

   $scope.showReport = function(){
       mostrarReportes($http, $scope);
   }
        
    function mostrarReportes($http, $scope) {
    
        // Trae la información de los reportes(Adopción y maltrato) con la direccion
        var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';
    
        $http.post(link, {
            method: 'getID',
            id: $scope.ID
        }).then(function successCallback(response) {
            $scope.arrayCasos = response.data;
            // $localStorage.LATITUDDESTINO = $scope.arrayCasos[0].LATITUD; 
            // $localStorage.LONGITUDDESTINO = $scope.arrayCasos[0].LONGITUD;
             $scope.successCallback = true;

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
         
    } 
});




