// Esto es un conflicto con alex

angular.module('starter', ['ionic',  'loginModule','registerModule'])

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
          templateUrl:'js/app/main/home.html'
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
    
    .state('app.createReport', {
      url: '/createReport', 
      views:{
        'content':{
          templateUrl:'js/app/reports/create.html'
          //AÑADIR CONTROLLER
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
});