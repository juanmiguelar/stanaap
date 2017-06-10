// Esto es un conflicto con alex

angular.module('starter', ['ionic',  'loginModule','registerModule', 'reportModule', 'mapModule', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

//comentario
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'js/app/menu/menu.html'
  })
  
   .state('app.home', {
      url: '/home', 
      views:{
        'content':{
          templateUrl:'js/app/main/home.html',
          controller:'MapCtrl'
        }
      }
    })
    
    .state('app.login', {
      url: '/login', 
      views:{
        'content':{
          templateUrl:'js/app/user/login.html',
          controller: 'loginController'
        }
      }
    })
    
    .state('app.createReportMaltratoAbandono', {
      url: '/createReportMaltratoAbandono', 
      views:{
        'content':{
          templateUrl:'js/app/reports/createReportMaltratoAbandono.html',
          controller: 'reportController'
        }
      }
    })
    
    .state('app.animalMaltratoAbandonoInfo', {
      url: '/animalMaltratoAbandonoInfo', 
      views:{
        'content':{
          templateUrl:'js/app/reports/animalMaltratoAbandonoInfo.html',
         controller: 'reportController'
        }
      }
    })
    
    .state('app.animalAdopcionInfo', {
      url: '/animalAdopcionInfo', 
      views:{
        'content':{
          templateUrl:'js/app/reports/animalAdopcionInfo.html',
          controller: 'reportController'
        }
      }
    })
    
     .state('app.createReport', {
      url: '/createReport', 
      views:{
        'content':{
          templateUrl:'js/app/reports/createReport.html',
          controller: 'reportController'
        }
      }
    })
    
    .state('app.createReportAdopcion', {
      url: '/createReportAdopcion', 
      views:{
        'content':{
          templateUrl:'js/app/reports/createReportAdopcion.html',
          controller: 'reportController'
        }
      }
    })

    .state('app.register', {
      url: '/register', 
      views:{
        'content':{
          templateUrl:'js/app/user/register.html', 
          controller: 'registerController'
        }
      }
    });
    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/login');
})

/*.controller('MapCtrl', function($scope, $state) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  //Localización por CORDOVA
  //$cordovaGeolocation.getCurrentPosition(options).then(function(position)
  
  var uluru = {lat: 10.087, lng: -84.47};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: uluru
  })
   var marcador = new google.maps.LatLng(uluru);
    
    var contentString = '<div class="list card">' +
  '<div class="item item-avatar">' +
     '<img src="img/avatar.jpg"> ' + 
      '<h2>Título del caso </h2>' +
     '<p>Breve descripcion</p>' +
    '</div>'+
  
    '<div class="item item-image">' +
      '<img src="img/cover.jpg">' +
    '</div>' +
  
   '<a class="item item-icon-left assertive" href="#">' +
      '<i class="icon ion-navigate"></i>' +
     'Ver mas detalles'+
    '</a>'+
    '</div>';
  
    
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var nameMarker = "marker";
    nameMarker = new google.maps.Marker({
      position: uluru,
      map: map,
      title: 'Reporte'
    });  
      nameMarker.addListener('click', function() {
        infowindow.open(map, nameMarker);  
      });
});*/
