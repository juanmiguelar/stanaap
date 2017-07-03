angular.module('menuModule', ['ngStorage'])

.controller('menuController', function($http, $scope, $ionicPopup, $state, $localStorage,$ionicSideMenuDelegate) {
    
    // Esto es por defecto
   $scope.showIniciar = {};
   $scope.showIniciar.show = true;
   $scope.showSalir = {};
   $scope.showSalir.show = false;
   
   $scope.validarMenu = function(){
   
    // Aqui los valores van cambiando
       if($localStorage.CORREO_USUARIO == ""){
            // En el caso de que el correo existe debe aparecer el salir sesion
            console.log("Si hay correo");
            
           $scope.showSalir.show = true;
           $scope.showIniciar.show = false;
       }else{
           // En caso de que no existe debe aparecer el iniciar sesion
           console.log("No hay correo");
           
           $scope.showSalir.show = false;
           $scope.showIniciar.show = true;
       } 
   }
   
  
});
