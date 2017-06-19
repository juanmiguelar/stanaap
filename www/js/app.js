// Esto es un conflicto con aleclearasdfsdx

angular.module('starter', ['ionic',  'loginModule','registerModule', 
              'reportModule', 'mapModule', 'showReportModule','logoutModule',
              'ngStorage','ngCordova' ])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'js/app/menu/menu.html'
  })
  
  
  .state('app.showReportMaltratoAbandono', {
      url: '/showReportMaltratoAbandono', 
      views:{
        'content':{
          templateUrl:'js/app/reports/showReportMaltratoAbandono.html',
          controller: 'showReportController'
        }
      }
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
    
     .state('app.logout', {
      url: '/logout', 
      views:{
        'content':{
          controller: 'logoutController'
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
  $urlRouterProvider.otherwise('app/home');

});