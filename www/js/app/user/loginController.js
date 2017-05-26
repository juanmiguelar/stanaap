angular.module('loginModule', ['ngStorage'])

.controller('loginController', function($http,$scope, $ionicPopup, $state, $localStorage){
    
    $scope.login = function() {
    
    if($scope.email == null || $scope.password == null){
        var alertPopup = $ionicPopup.alert({
                    title: 'Datos incompletos',
                    template: 'Debe ingresar el email y contraseña'
                });
                alertPopup.then(function(res) {
                    $state.go('app.login');
                });
    }else{
        
        validarUsuario($http,$scope,$ionicPopup, $state, $localStorage);
    
    }
    
    };
});


function validarUsuario($http,$scope, $ionicPopup, $state, $localStorage){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
 
        $http.post(link, {method:'validarUsuario', email : $scope.email, password : $scope.password }).then(function (result){
            
            $scope.response = result.data;
            var respuesta = $scope.response;
            //Si la respuesta no es vacia se cumple la condición
            if(respuesta[0]["CANTIDAD"] == 1){
                  $localStorage.CORREO_USUARIO = $scope.email;
                  $state.go('app.createReport');
                
            }
            if(respuesta[0]["CANTIDAD"] == 0){
                var alertPopup = $ionicPopup.alert({
                     title: 'Datos Inválidos',
                     template: 'La contraseña o correo son incorrectos.'
                });
                
            }
        });
    //     , 
    //         function errorCallback(response) {
    //          // called asynchronously if an error occurs
    //         // or server returns response with an error status.
            
    //         var alertPopup = $ionicPopup.alert({
    //              title: '¿Conexión?',
    //              template: 'Al parecer no tienes conexión a internet'
    //           });
            
    //   });
  }
  