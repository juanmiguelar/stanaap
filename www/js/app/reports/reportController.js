angular.module('reportModule' ,[])


.controller('reportController', function($http,$scope, $ionicPopup, $state){
    var latitude,longitude, tipoReporte;
    
    $scope.showSelectValue = function(tipo) {
        tipoReporte = tipo; 
        
    }
    
    
    $scope.insertarReporte = function() {
    
        latitude = 37.78;
        longitude = -121.977; 
        
       insertarDireccion($http, $scope,$ionicPopup,$state,latitude, longitude);
        
        
        if(tipoReporte == "abandono" || tipoReporte == "maltrato"){
            insertarAnimalMaltrato($http,$scope,$ionicPopup,$state);
        }else{
           insertarAnimalAdopcion($http,$scope,$ionicPopup,$state);
        }
        
    };
});
//INCOMPLETO
function insertarReporte($http,$scope,$ionicPopup,$state,latitude, longitude){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/direccionRouter.php';
 
        $http.post(link, {method:'add', longitud : longitude, latitud : latitude }).then(function (result){
            
            $scope.response = result.data;
            $scope.respuesta = $scope.response.replace('\n', '');
            
        }).then(function successCallback(response) {
            return true;
          }, function errorCallback(response) {
            var alertPopup = $ionicPopup.alert({
                 title: 'Ubicación'  ,
                 template: 'La ubicación se no se ha podido identificar.'
              });
              alertPopup.then(function(res) {
                    $state.go('app.home');
                });
          });
  }


function insertarDireccion($http,$scope,$ionicPopup,$state,latitude, longitude){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/direccionRouter.php';
 
        $http.post(link, {method:'add', longitud : longitude, latitud : latitude }).then(function (result){
            
            $scope.response = result.data;
            $scope.respuesta = $scope.response.replace('\n', '');
            
        }).then(function successCallback(response) {
            return true;
          }, function errorCallback(response) {
            var alertPopup = $ionicPopup.alert({
                 title: 'Ubicación'  ,
                 template: 'La ubicación se no se ha podido identificar.'
              });
              alertPopup.then(function(res) {
                    $state.go('app.home');
                });
          });
  }

function insertarAnimalAdopcion($http,$scope,$ionicPopup,$state){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/animalAdopcionRouter.php';
 
     $scope.especie =  "Perro";
     $scope.raza = "Beagle";
     $scope.edad = 4;
     $scope.tamanno = "Mediano";
    
        $http.post(link, {method:'add', especieAdopcion : $scope.especie, raza : $scope.raza, edad : $scope.edad , tamanno : $scope.tamanno}).then(function (result){
            
            $scope.response = result.data;
            $scope.respuesta = $scope.response.replace('\n', '');
            
        }).then(function successCallback(response) {
            $scope.respuesta = true;
          }, function errorCallback(response) {
            var alertPopup = $ionicPopup.alert({
                 title: 'Servidor no disponible'  ,
                 template: 'Lo sentimos!.'
              });
              alertPopup.then(function(res) {
                    $state.go('app.home');
                });
          });
  }
  function insertarAnimalMaltrato($http,$scope,$ionicPopup,$state){
      
      $scope.especie =  "Perro";
      $scope.raza = "Beagle";
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/animalMaltratoRouter.php';
 
        $http.post(link, {method:'add', especieMaltrato : $scope.especie , raza : $scope.raza}).then(function (result){
            
            $scope.response = result.data;
            $scope.respuesta = $scope.response.replace('\n', '');
            
        }).then(function successCallback(response) {
            $scope.respuesta = true;
          }, function errorCallback(response) {
            var alertPopup = $ionicPopup.alert({
                 title: 'Servidor no disponible'  ,
                 template: 'Lo sentimos!.'
              });
              alertPopup.then(function(res) {
                    $state.go('app.home');
                });
          });
  }


function validarReporte($http,$scope, $ionicPopup, $state){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
 
        $http.post(link, {method:'validarUsuario', email : $scope.email, password : $scope.password }).then(function (result){
            
            $scope.response = result.data;
            var respuesta = $scope.response.replace('\n', '');
            
            //Si la respuesta no es vacia se cumple la condición
            if(respuesta){
                
                  $state.go('app.home');
               
            }else{
                var alertPopup = $ionicPopup.alert({
                 title: 'Datos Inválidos',
                 template: 'La contraseña o correo son incorrectos.'
              });
            }
        });
  }
  