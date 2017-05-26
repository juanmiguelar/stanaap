angular.module('reportModule', ['ngStorage'])


.controller('reportController', function($http, $scope, $ionicPopup, $state, $localStorage) {
    ///SCOPES DE CASOS DE MALTRATO O ABANDONO
    
    $scope.ubicacionAdopcion = function(){
        obtenerUbicacion($localStorage);
        insertarDireccion($http, $scope, $ionicPopup, $state, $localStorage);
    }
    
    $scope.guardarInfoReporteGeneralMaltrato = function(){
        $localStorage.tipoMaltrato = $scope.tipo;
        $localStorage.tituloMaltrato = $scope.titulo;
        $localStorage.descripcionMaltrato = $scope.descripcion;
    }
    
    $scope.guardarInfoReporteMaltrato = function() {
        insertarAnimalMaltrato($http, $scope, $ionicPopup, $state, $localStorage);
        insertarReporteGeneralMaltrato($http, $scope, $ionicPopup, $state, $localStorage);
        
    }
    
    ///SCOPES DE CASOS DE ADOPCION
    
    $scope.ubicacionAdopcion = function(){
        obtenerUbicacion($localStorage);
        insertarDireccion($http, $scope, $ionicPopup, $state, $localStorage);
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
        latitud: $localStorage.latitud
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


function insertarAnimalMaltrato($http, $scope, $ionicPopup, $state, $localStorage) {

    var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/animalMaltratoRouter.php';

    $http.post(link, {
        method: 'add',
        especieMaltrato: $scope.especie,
        raza: $scope.raza
        
    }).then(function(result) {
        
        $scope.response = result.data;
        $localStorage.ID_MALTRATO = $scope.response;
    });
}


function insertarReporteGeneralMaltrato($http, $scope, $ionicPopup, $state, $localStorage) {

      var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';
    
    $http.post(link, {
        method: 'addGeneralMaltrato',
        titulo: $localStorage.tituloMaltrato,
        descripcion: $localStorage.descripcionMaltrato,
        id_direccion: $localStorage.ID_DIRECCION,
        id_maltrato: $localStorage.ID_MALTRATO,
        correo: $localStorage.CORREO_USUARIO,
        tipo: $localStorage.tipoMaltrato
        
    }).then(function(result) {

        $scope.response = result.data;
        console.log($scope.response);
        
        if($scope.response == 1){
            var alertPopup = $ionicPopup.alert({
                    title: 'Reportar caso',
                    template: 'Se ha reportado el caso!'
                });
                alertPopup.then(function(res) {
                    $state.go('app.home');
                });
        }
        
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
        if($scope.response == 1){
            var alertPopup = $ionicPopup.alert({
                    title: 'Reportar caso',
                    template: 'Se ha reportado el caso!'
                });
                alertPopup.then(function(res) {
                    $state.go('app.home');
                });
        }
        
    });

}

// $scope.showSelectValue = function(tipo) {
//     tipoReporte = tipo; 

// }