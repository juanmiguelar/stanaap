var arrayPos = [];

angular.module('mapModule', ['ngStorage'])

.controller('MapCtrl', function($http,$scope){
     $scope.data = {};
        
        initMap();

})
  
function initMap() {
  
  var uluru = {lat: 10.087, lng: -84.47};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: uluru
  });
 
        /*ACA lo del array*/
        
    var arrayUbicaciones = [{lat: 10.087, long: -84.47}, {lat: 10.0666667, long: -84.3166667}];
    var count = Object.keys(arrayUbicaciones).length;
    var infowindow = new google.maps.InfoWindow();

    var marker, i, contentString;
    for (i = 0; i < count; i++) {   
    var latitud = parseFloat(arrayUbicaciones[i].lat);
    var longitud = parseFloat(arrayUbicaciones[i].long);
   
     marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitud, longitud),
      map: map,
      icon: 'img/report.png'
    }); 
 
    contentString = '<div class="list card">' +
  '<div class="item item-avatar">' +
    /* '<img src="img/avatar.jpg"> ' + */
      '<h2>Título del caso </h2>' +
     '<p>Breve descripcion</p>' +
    '</div>'+
  
    '<div class="item item-image">' +
      /*'<img src="img/cover.jpg">' +*/
    '</div>' +
  
   '<a class="item item-icon-left assertive" href="#">' +
      '<i class="icon ion-plus-round"></i>' +
     'Ver Detalles'+
    '</a>'+
    '</div>';
  
google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
        }
      })(marker, i));
 }
}



