var arrayPos = [];

angular.module('mapModule', ['ngStorage'])

                                                                    // Aqui recibo el geolocation
.controller('MapCtrl', function($http,$scope, $state, $localStorage, $ionicPopup, $cordovaGeolocation){

    $scope.data = {};
    mostrarReportes($http, $scope, $state,$localStorage, $cordovaGeolocation, $ionicPopup); 
    
    
//     $scope.go = function () {
//   $location.path('#/app/showReportMaltratoAbandono');
//     };

  $scope.detalle = function(idReporte, tipo){
    $localStorage.TIPO = tipo;
    $localStorage.ID = idReporte;
  }

 });


// Cargando el array del servidor
function mostrarReportes($http, $scope, $state,$localStorage, $cordovaGeolocation, $ionicPopup) {
    
        // Trae la información de los reportes(Adopción y maltrato) con la direccion
        var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';
    
        $http.post(link, {
            method: 'show',
            email: $localStorage.CORREO_USUARIO
        }).then(function successCallback(response) {
           $scope.arrayCasos = response.data
           initMap($scope, $localStorage, $cordovaGeolocation, $ionicPopup);
          }, function errorCallback(response) {
          });
    }
// 
  
function initMap($scope, $localStorage, $cordovaGeolocation, $ionicPopup) {
  //var uluru = {lat: 10.087, lng: -84.47};
  
  // Esta es la función que esta en el report controller. 
  obtenerUbicacion2($localStorage, $cordovaGeolocation, $ionicPopup);////e
  var uluru = {lat: $localStorage.latitud, lng: $localStorage.longitud};
  
  //console.log(uluru);
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });
  

 
        /*ACA lo del array*/

    var arrayUbicaciones = $scope.arrayCasos;
    var count = Object.keys(arrayUbicaciones).length;
    var infowindow = new google.maps.InfoWindow();
    var marker, i, contentString;
    for (i = 0; i < count; i++) {   
        var latitud = parseFloat(arrayUbicaciones[i].LATITUD);
        var longitud = parseFloat(arrayUbicaciones[i].LONGITUD);
       
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latitud, longitud),
          map: map,
          icon: 'img/report.png'
        }); 
    

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              if(arrayUbicaciones[i].TIPO == "maltrato" || arrayUbicaciones[i].TIPO == "abandono"){
                $localStorage.ID = arrayUbicaciones[i].ID_MALTRATO;
               
              }else{
                $localStorage.ID = arrayUbicaciones[i].ID_ADOPCION; 
                
              }
              $localStorage.TIPO = arrayUbicaciones[i].TIPO; 
              contentString = 
        '<div class="list card">' +
          '<div class="item item-avatar">' +
          '<img width="30vh" height="50vh" src="http://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/images/'+ arrayUbicaciones[i].IMAGEN +'">' +
          '<h2>'+ arrayUbicaciones[i].TITULO + '</h2>' +
          '<p>'+ arrayUbicaciones[i].DESCRIPCION + '</p>' +
          '</div>'+
          '<a class="item item-icon-left assertive" href="#/app/showReportMaltratoAbandono" ng-click="detalle('+ $localStorage.ID +', '+ $localStorage.TIPO +')">' +
          '<i class="icon ion-plus-round"></i>' +
          'Ver Detalles'+
          '</a>'+
        '</div>';
              infowindow.setContent(contentString);
              infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

function obtenerUbicacion2($localStorage, $cordovaGeolocation, $ionicPopup) {
  
	var posOptions = {
		timeout: 15000,
		enableHighAccuracy: true
	};

	$cordovaGeolocation
		.getCurrentPosition(posOptions)
		.then(function(position) {
			var lat = position.coords.latitude
			var long = position.coords.longitude

			$localStorage.latitud = lat;
			$localStorage.longitud = long;

		}, function(err) {
			var alertPopup = $ionicPopup.alert({
				title: 'Ha ocurrido un error',
				template: 'Error con la ubicación'
			});
		});
}




