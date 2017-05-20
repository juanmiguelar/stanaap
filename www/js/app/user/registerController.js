angular.module('registerModule')

.controller('registerController', function($http, $scope, $ionicPopup, $state) {

    $scope.register = function() {

        // Valido la contraseña
        var result = validateEmail($scope.correo);
        // Valido las contraseñas
        var contras = verifyContra($scope.contrasenna, $scope.verify)
        
        // Si las 2 están bien se puede registrar
        if (result && contras) {
            insertarUsuario($http, $scope, $ionicPopup, $state);
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
                });
            }
        }
    };
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function verifyContra(contra, verify){
    return contra == verify;
}

function insertarUsuario($http, $scope, $ionicPopup, $state) {
    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';

    $http.post(link, {
        method: 'add',
        correo: $scope.correo,
        contrasenna: $scope.contrasenna,
        nombre: $scope.nombre
    }).then(function(result) {

        $scope.response = result.data;
        var respuesta = $scope.response.replace('\n', '');
        
        if (respuesta == 1) {
            var alertPopup = $ionicPopup.alert({
                title: 'Bienvenido a Stanapp',
                template: 'Se ha registrado con éxito'
            });
            alertPopup.then(function(res) {
                $state.go('app.home');
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