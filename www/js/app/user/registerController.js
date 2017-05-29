angular.module('registerModule',['ngStorage'])

.controller('registerController', function ($http, $scope, $ionicPopup, $state, $localStorage) {
    
    $scope.register = function() {
        
    if($scope.nombre == null || $scope.contrasenna == null || $scope.verify == null){
            var alertPopup = $ionicPopup.alert({
                title: 'Datos incompletos',
                template: 'Debe ingresar todos los datos del formulario'
                });
                alertPopup.then(function(res) {
                    $state.go('app.register');
                });   
    }else{
            // Valido la contraseña
            var result = validateEmail($scope.correo);
            $scope.resultadoEmail = result;
            
            // Valido las contraseñas
            var contras = verifyContra($scope.contrasenna, $scope.verify)
            $scope.resultadoContrasenna = contras;
            
            // Si las 2 están bien se puede registrar
            if (result && contras) {
                insertarUsuario($http, $scope, $ionicPopup, $state, $localStorage);
            }else{
                
                // Identificar el fallo para poder dar feedback
                if (!result) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Datos Inválidos',
                        template: 'El correo no es válido.'
                    });
                }
                
                if (!contras) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Datos Inválidos',
                        template: 'Las contraseñas no coinciden.'
                    })
                }
            }
        }    
    }

})
//prueba de jasmine
.controller('prueba', function($http,$scope){
    
    $scope.settings =  {
        casa: true
    };
});
   
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    function verifyContra(contra, verify){
        return contra == verify;
    }
    
    function insertarUsuario($http, $scope, $ionicPopup, $state, $localStorage) {
        var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';
    
        $http.post(link, {
            method: 'add',
            correo: $scope.correo,
            contrasenna: $scope.contrasenna,
            nombre: $scope.nombre
        }).then(function(result) {
    
            $scope.response = result.data;
            console.log($scope.response);
            var respuesta = $scope.response;
            $scope.respuestaRegistarusuario = respuesta;        
            
            if (respuesta == 1) {
                $localStorage.CORREO_USUARIO = $scope.correo;
                var alertPopup = $ionicPopup.alert({
                    title: 'Bienvenido a Stanapp',
                    template: 'Se ha registrado con éxito'
                });
                alertPopup.then(function(res) {
                    $state.go('app.createReport');
                });
    
            }
            else{
    
                var alertPopup = $ionicPopup.alert({
                        title: 'Datos Inválidos',
                        template: 'El correo ' + $scope.correo + ' ya existe! Ingrese otro'
                    });
            }
        });
    }