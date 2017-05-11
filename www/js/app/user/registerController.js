angular.module('registerModule')

.controller('registerController', function($http,$scope){
     $scope.data = {};
     
    $scope.register = function() {
     insertarUsuario($http,$scope);
    }
})

function insertarUsuario($http,$scope){
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/./structure/routers/userRouter.php';
        
        $http.post(link, {method:'add', nombre : $scope.data.nombre, apellido : $scope.data.apellido, email : $scope.data.email }).then(function (res){
            
            $scope.response = res.data;
            console.log($scope.response)
        });
  }
  