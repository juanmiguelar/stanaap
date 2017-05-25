angular.module('loginModule', ['ngStorage'])

.controller('loginController', function($http,$scope, $ionicPopup, $state, $localStorage){
    
    $scope.login = function() {
    
    validarUsuario($http,$scope,$ionicPopup, $state, $localStorage);
    
    };
});


function validarUsuario($http,$scope, $ionicPopup, $state, $localStorage){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
 
        $http.post(link, {method:'validarUsuario', email : $scope.email, password : $scope.password }).then(function (result){
            
            $scope.response = result.data;
            var respuesta = $scope.response;
           
            //Si la respuesta no es vacia se cumple la condición
            if(respuesta){
                  $localStorage.CORREO_USUARIO = $scope.email;
                  $state.go('app.createReport');
               
            }else{
                var alertPopup = $ionicPopup.alert({
                 title: 'Datos Inválidos',
                 template: 'La contraseña o correo son incorrectos.'
              });
            }
        });
  }
  