angular.module('loginModule', [])

.controller('loginController', function($http,$scope, $ionicPopup, $state){
    
    $scope.login = function() {
    
        validarUsuario($http,$scope,$ionicPopup, $state);
    
    };
});


function validarUsuario($http,$scope, $ionicPopup, $state){
    
     var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
 
        $http.post(link, {method:'validarUsuario', email : $scope.email, password : $scope.password }).then(function (result){
            
            $scope.response = result.data;
            console.log($scope.response);
            
        });
  }
  