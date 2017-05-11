angular.module('registerModule')

.controller('registerController', function($http,$scope){
     $scope.data = { email : "priscila@gmail.com", contrasenna : "123", nombre : "Priscila"};
     
    $scope.register = function() {
     insertarUsuario($http,$scope);
    };
});

function insertarUsuario($http,$scope){
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
        
        $http.post(link, {method:'add', email : $scope.data.email, contrasenna : $scope.data.contrasenna,nombre : $scope.data.nombre}).then(function (result){
            
            $scope.response = result.data;
            console.log($scope.response);
        });
  }
  