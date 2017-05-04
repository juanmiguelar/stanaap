angular.module('registerModule')

.controller('registerController', function($http,$scope, User){
     $scope.data = {};
        ////jdofijvbgjbdjvbh
    $scope.register = function() {
        
    //var user = User.build($scope.nombre, $scope.apellido, $scope.email)
  
   
        insertarUsuario($http,$scope);
    }
})

function insertarUsuario($http,$scope){
     var link = 'https://app-backendserver-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
        
        $http.post(link, {method:'add', nombre : $scope.data.nombre, apellido : $scope.data.apellido, email : $scope.data.email }).then(function (res){
            
            $scope.response = res.data;
            console.log($scope.response)
        });
  }
  