// Esto es un conflicto con alex

angular.module('starter', ['ionic',  'loginModule','registerModule', 'reportModule', 'mapModule', 'showReportModule', 'ngStorage','ngCordova'])


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

//comentario
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



.controller('ImageCtrl', function ($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {
  $scope.image = null;
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };
 
$scope.loadImage = function() {
  var options = {
    title: 'Select Image Source',
    buttonLabels: ['Load from Library', 'Use Camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture(type);
    }
  });
};

$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};

$scope.pathForImage = function(image) {
  if (image === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + image;
  }
};


});
