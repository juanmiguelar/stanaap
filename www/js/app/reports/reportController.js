angular.module('reportModule' ,[])


.controller('reportController', function($http,$scope, $ionicPopup, $state){
    
    $scope.insertarReporte = function() {
        
        validarReporte($http,$scope,$ionicPopup);
        //validarReporte($http,$scope,$ionicPopup, $state);
    
    };
});


function insertarDireccion($http,$scope, $ionicPopup){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/direccionRouter.php';
 
        $http.post(link, {method:'add', email : $scope.email, password : $scope.password }).then(function (result){
            
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
  