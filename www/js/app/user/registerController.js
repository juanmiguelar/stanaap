angular.module('registerModule')

.controller('registerController', function($http, $scope, $ionicPopup, $state) {

    $scope.register = function() {

        var result = validateEmail($scope.correo);
        
        if (result) {
            insertarUsuario($http, $scope, $ionicPopup, $state);
        }else{
            var alertPopup = $ionicPopup.alert({
                    title: 'Advertencia',
                    template: 'El correo no es valido'
                });
        }
    };
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
        var respuesta = $scope.response.replace(/['"]+/g, '');
        if (respuesta == "true") {
            var alertPopup = $ionicPopup.alert({
                title: 'Bienvenido a Stanapp',
                template: 'Se ha registrado con éxito'
            });
            alertPopup.then(function(res) {
                $state.go('app.home');
            });

        }
        else {

            if ($scope.correo) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ha ocurrido un error',
                    template: 'El correo ' + $scope.correo + ' ya existe! Ingrese otro'
                });
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Advertencia',
                    template: 'El correo no es valido'
                });
            }


        }
    });
}
