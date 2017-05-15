angular.module('registerModule')

.controller('registerController', function($http,$scope){
    
    $scope.register = function() {

     


    validarCorreo($http,$scope);
    
        
    //insertarUsuario($http,$scope);

    };
});



function validarCorreo($http,$scope){
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
 
        $http.post(link, {method:'validarCorreo', correo : $scope.correo }).then(function (result){
            
            $scope.response = result;
        console.log($scope.response);
        });
  }


function insertarUsuario($http,$scope){
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
 
        $http.post(link, {method:'add', correo : $scope.correo, contrasenna : $scope.contrasenna, nombre : $scope.nombre}).then(function (result){
            
            $scope.response = result.data;
            console.log($scope.response);
        });
  }
  