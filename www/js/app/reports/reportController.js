angular.module('reportModule', ['ngStorage'])


.controller('reportController', function($http, $scope, $ionicPopup, $state, $localStorage) {
    
    $scope.crearReporteAbandonoMaltrato = function(){
        obtenerUbicacion($localStorage);
        insertarDireccion($http, $scope, $ionicPopup, $state, $localStorage);
        
    }
    ///SCOPES DE CASOS DE ADOPCION
    
    $scope.ubicacionAdopcion = function(){
        obtenerUbicacion($localStorage);
        insertarDireccion($http, $scope, $ionicPopup, $state, $localStorage);
        console.log($localStorage.CORREO_USUARIO);
    }
    
    $scope.guardarInfoReporteGeneralAdopcion = function(){
        $localStorage.titulo = $scope.titulo;
        $localStorage.descripcion = $scope.descripcion;
    }
    
    $scope.guardarInfoReporteAdopcion = function() {
        insertarAnimalAdopcion($http, $scope, $ionicPopup, $state, $localStorage);
        insertarReporteGeneralAdopcion($http, $scope, $ionicPopup, $state, $localStorage);
        
    };
});

function obtenerUbicacion($localStorage) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            $localStorage.latitud = pos["lat"];
            $localStorage.longitud = pos["lng"];

        });
    }
    else {
        console.log("No sirve");
    }
}

function insertarDireccion($http, $scope, $ionicPopup, $state, $localStorage) {

    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/direccionRouter.php';

    $http.post(link, {
        method: 'add',
        longitud: $localStorage.longitud,
        latitud: $localStorage.longitud
    }).then(function(result) {

        $scope.response = result.data;
        $localStorage.ID_DIRECCION = $scope.response;
    });
}

function insertarAnimalAdopcion($http, $scope, $ionicPopup, $state, $localStorage) {

    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/animalAdopcionRouter.php';

    $http.post(link, {
        method: 'add',
        especieAdopcion: $scope.especie,
        raza: $scope.raza,
        edad: $scope.edad,
        tamanno: $scope.tamanno
    }).then(function(result) {
        
        $scope.response = result.data;
        $localStorage.ID_ADOPCION = $scope.response;
    });
}

function insertarAnimalMaltratoAbandono($http, $scope, $ionicPopup, $state, $localStorage) {

    $scope.especie = "Perro";
    $scope.raza = "Beagle";

    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/animalMaltratoRouter.php';

    $http.post(link, {
        method: 'add',
        especieMaltrato: $scope.especie,
        raza: $scope.raza
    }).then(function(result) {

        $scope.response = result.data;
        $scope.respuesta = $scope.response.replace('\n', '');

    }).then(function successCallback(response) {
        $scope.respuesta = true;
    }, function errorCallback(response) {
        var alertPopup = $ionicPopup.alert({
            title: 'Servidor no disponible',
            template: 'Lo sentimos!.'
        });
        alertPopup.then(function(res) {
            $state.go('app.home');
        });
    });
}

function insertarReporteGeneralAdopcion($http, $scope, $ionicPopup, $state, $localStorage) {

    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';
    
    $http.post(link, {
        method: 'addGeneralAdopcion',
        titulo: $localStorage.titulo,
        descripcion: $localStorage.descripcion,
        id_direccion: $localStorage.ID_DIRECCION,
        id_adopcion: $localStorage.ID_ADOPCION,
        correo: $localStorage.CORREO_USUARIO
        
    }).then(function(result) {

        $scope.response = result.data;
        if($scope.response =){
            
        }
        
    });

}

// $scope.showSelectValue = function(tipo) {
//     tipoReporte = tipo; 

// }