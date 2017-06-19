angular.module('loginModule', ['ngStorage'])

.controller('loginController', function($http, $scope, $ionicPopup, $state, $localStorage) {

    $scope.login = function() {

        if ($scope.email == null || $scope.password == null || $scope.email == "" || $scope.password == "") {
            var alertPopup = $ionicPopup.alert({
                title: 'Datos incompletos',
                template: 'Debe ingresar el email y contraseña'
            });
            alertPopup.then(function(res) {
                $state.go('app.login');
            });
        }
        else {

            if (validateEmail($scope.email)) {
                validarUsuario($http, $scope, $ionicPopup, $state, $localStorage);
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Revisa el correo',
                    template: 'El correo esta mal escrito.'
                });
                alertPopup.then(function(res) {
                    $state.go('app.login');
                });
            }

        }

    };
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function validarUsuario($http, $scope, $ionicPopup, $state, $localStorage) {

    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/userRouter.php';

    $http.post(link, {
        method: 'validarUsuario',
        email: $scope.email,
        password: $scope.password
    }).then(function(result) {

        if (result.data == 0) {
            var alertPopup = $ionicPopup.alert({
                title: 'Credenciales incorrectas',
                template: '¿Has olvidado su contraseña?.'
            });
            alertPopup.then(function(res) {
                $state.go('app.login');
            });
        }

        if (result.data == 1) {
            $localStorage.CORREO_USUARIO = $scope.email;
            $state.go('app.home');
        }

        if (result.data != 0 && result.data != 1) {
            var alertPopup = $ionicPopup.alert({
                title: 'Advertencia',
                template: 'Revisa la conexión a internet'
            });
            alertPopup.then(function(res) {
                $state.go('app.login');
            });
        }
    });
    //     , 
    //         function errorCallback(response) {
    //          // called asynchronously if an error occurs
    //         // or server returns response with an error status.

    //         var alertPopup = $ionicPopup.alert({
    //              title: '¿Conexión?',
    //              template: 'Al parecer no tienes conexión a internet'
    //           });

    //   });
}