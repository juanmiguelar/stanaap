var arrayPos = [];

angular.module('mapModule', ['ngStorage'])

.controller('MapCtrl', function($http,$scope, $state, $localStorage){
  
    
    mostrarReportes($http, $scope, $state,$localStorage);  
})

// Cargando el array del servidor
function mostrarReportes($http, $scope, $state,$localStorage) {
    
        // Trae la información de los reportes(Adopción y maltrato) con la direccion
        var link = 'https://priscila-backendserve-juanmiguelar09.c9users.io/structure/routers/reportRouter.php';
    
        $http.post(link, {
            method: 'show',
            email: $localStorage.CORREO_USUARIO
        }).then(function successCallback(response) {
           $scope.arrayCasos = response.data
           
           initMap($scope,$localStorage);
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
    }
// 
  
function initMap($scope, $localStorage) {
  var uluru = {lat: 10.087, lng: -84.47};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: uluru
  });
 
        /*ACA lo del array*/
    // var arrayUbicaciones = [{lat: 10.087, long: -84.47}, {lat: 10.0666667, long: -84.3166667}];
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
              $localStorage.ID = arrayUbicaciones[i].ID_MALTRATO;
              contentString = 
        '<div class="list card">' +
          '<div class="item item-avatar">' +
          /* '<img src="img/avatar.jpg"> ' + */
          '<h2>'+ arrayUbicaciones[i].TITULO + '</h2>' +
          '<p>'+ arrayUbicaciones[i].DESCRIPCION + '</p>' +
          '</div>'+
        
          '<div class="item item-image">' +
            /*'<img src="img/cover.jpg">' +*/
          '</div>' +
        
          '<a class="item item-icon-left assertive" href="/#/app/showReportMaltratoAbandono">' +
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



