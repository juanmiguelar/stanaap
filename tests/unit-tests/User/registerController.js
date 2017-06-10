angular.module('registerModule',[])

.controller('registerController', function ($http, $scope, $ionicPopup, $state) {
    
    $scope.validarEmail = function() {
  
            // Valido la contraseña
            var result = validateEmail($scope.correo);
            $scope.resultadoEmail = result;
            
            
    }
    $scope.validarContraseña = function(){
            // Valido las contraseñas
            var contras = verifyContra($scope.contrasenna, $scope.verify)
            $scope.resultadoContrasenna = contras;
    }
    
    
    $scope.insertarUser = function(){
     insertarUsuario($http, $scope);
    }
});
   
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function verifyContra(contra, verify){
        return contra == verify;
    }
    function insertarUsuario($http, $scope) {
        var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
     
        $http.post(link, {
            method: 'add',
            correo: $scope.correo,
            contrasenna: $scope.contrasenna,
            nombre: $scope.nombre
        }).then(function(result) {
    
            $scope.response = result.data;
            console.log($scope.response);
        });
    }
    